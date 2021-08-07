<template>
<nav class="container">
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Categorías</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <button @click="crearPDF"><v-icon> mdi-printer-check</v-icon></button>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          append-icon="mdi-magnify"
          label="Búsqueda"
          v-model="search"
          single-line
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog 
        v-model="dialog" 
        max-width="500px">
          <template v-slot:activator="{on}">
             <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{tituForm}}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="nombre"
                      label="Nombre"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      v-model="descripcion"
                      label="Descripción"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12 v-show="valida">
                    <div
                      class="red--text"
                      v-for="v in validaMensaje"
                      :key="v"
                      v-text="v"
                    ></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="cerrar">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="Modal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="Accion == 1">
              Activar
            </v-card-title>
            <v-card-title class="headline" v-if="Accion == 2">
              Desactivar
            </v-card-title>
            <v-card-text>
              Estás a punto de <span v-if="Accion == 1">activar </span>
              <span v-if="Accion == 2">desactivar </span> el item
              {{ Nombre }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="actiDesaCerrar()"
                color="primary"
                flat="flat"
              >
                Cancelar
              </v-btn>
              <v-btn
                v-if="Accion == 1"
                @click="activar()"
                color="primary"
                flat="flat"
              >
                Activar
              </v-btn>
              <v-btn
                v-if="Accion == 2"
                @click="desactivar()"
                color="primary"
                flat="flat"
              >
                Desactivar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- ELIMINAR -->
        <v-dialog v-model="ModalEliminar" max-width="290">
          <v-card>
           <v-card-title class="headline" >
              Eliminar Item
            </v-card-title>
             <v-card-text>
              Estás a punto de eliminar el item <v-spacer></v-spacer> 
               {{Nombre}} 
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="DeleteCerrar()"
                color="primary"
                flat="flat"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>

      </v-toolbar>
    
      <v-data-table
        :headers="headers"
        :items="categorias"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <template v-if="item.estado">
            <v-icon 
            small 
            @click="actiDesaVer(2, item)">
              mdi-server-network
            </v-icon>
          </template>
          <template v-else>
            <v-icon small
             @click="actiDesaVer(1, item)">
              mdi-server-off
            </v-icon>
          </template>
        </template>
        <template v-slot:[`item.estado`]="{ item }">
          <div v-if="item.estado">
            <span class="blue--text">Activo</span>
          </div>
          <div v-else>
            <span class="red--text">Inactivo</span>
          </div>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Actualizar</v-btn>
        </template>
      </v-data-table> 
    </v-flex>
  </v-layout>
  </nav>
</template>


<script>
import axios from "axios";
import 'jspdf-autotable'
import jsPDF from "jspdf";
export default {
  data() {
    return {
      search: "",
      categorias: [],
      categoria: "holaa",
      dialog: false,
      headers: [
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedIndex: -1,
      id: "",
      nombre: "",
      descripcion: "",
// Validaciones 
      valida: 0,
      validaMensaje: [],
      Modal: 0,
      ModalEliminar: 0,
      Accion: 0,
      Nombre: "",
      Id: "",
    };
  },
  computed: {
    tituForm() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  watch: {
    dialog(val) {
      val || this.cerrar();
    },
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {
      let me = this;
      let header={headers:{"token":this.$store.state.token}}
      axios
        .get("categoria",header)
        .then(function (response) {
          me.categorias = response.data.categoria;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    crearPDF() {
      var columns = [
        { title: "Nombre", dataKey: "nombre" },
        { title: "Descripcion", dataKey: "descripcion" },
        { title: "Estado", dataKey: "estado" },
      ];
      var rows = [];
        console.log(this.categorias)
      this.categorias.map(function (x) {
        rows.push({
          nombre: x.nombre,
          descripcion: x.descripcion,
          estado: x.estado,
        });
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Categorias", 40, 30);
        },
      });

      doc.save("Categoria.pdf");
    },

    limpiar(){
      this.id = "";
      this.nombre = "";
      this.descripcion = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre de la categoría debe tener entre 1-50 caracteres."
        );
      }
      if (this.descripcion.length > 255) {
        this.validaMensaje.push(
          "La descripción de la categorí­a no debe tener más de 255 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      let me = this;
      let header={headers:{"token":this.$store.state.token}} 
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {      
         
        axios
          .put(`categoria/${me._id}`, {
            nombre: me.nombre,
            descripcion: me.descripcion,
          },header)
          .then(function () {
            me.limpiar();
            me.cerrar();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        let header={headers:{"token":this.$store.state.token}}  

        // CODIGO GUARDAR
        axios
          .post("categoria", {
            nombre: this.nombre,
            descripcion: this.descripcion,
          },header)
          .then(function () {
            me.limpiar();
            me.cerrar();
            me.listar();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editItem(item) {
      this._id = item._id;
      this.nombre = item.nombre;
      this.descripcion = item.descripcion;
      this.dialog = true;
      this.editedIndex = 1;
    },
    actiDesaVer(accion, item) {
      this.Modal = 1;
      this.Nombre = item.nombre;
      this.Id = item._id;
      if (accion == 1) {
        this.Accion = 1;
      } else if (accion == 2) {
        this.Accion = 2;
      } else {
        this.Modal = 0;
      }
    },
    actiDesaCerrar() {
      this.Modal = 0;
    },
    DeleteCerrar() {
      this.ModalEliminar = 0;
    },
    activar() {
      let me = this;
      let header={headers:{"token":this.$store.state.token}}  
      axios
        .put(`categoria/activar/${me.Id}`,{},header)
        .then(function () {
          me.Modal = 0;
          me.Accion = 0;
          me.Nombre = "";
          me.Id = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    desactivar() {
      let me = this;
      let header={headers:{"token":this.$store.state.token}}  
      axios
        .put(`categoria/desactivar/${me.Id}`,{},header)
        .then(function () {
          me.Modal = 0;
          me.Accion = 0;
          me.Nombre = "";
          me.Id = "";
          me.listar();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    cerrar() {
      this.dialog = false;
      this.limpiar;
    },
    deleteItem( item){
      this.ModalEliminar = 1;
      this.Nombre = item.nombre;
      this.Id = item._id;
    },
    eliminar(){
      var me ={
        "id": this.id,
        "token": this.$store.state.token
      };
      axios.delete(`categoria/${me._id}`,this.headers)
      .then(datos=>{
        console.log(datos);
      })
      } 
    
  },
};
</script>