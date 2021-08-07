<template>
<nav class="container">
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Proveedores</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="mdi-magnify"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ tituForm }}</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12>
                    <v-text-field 
                    v-model="nombre"
                     label="Nombre">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-select
                      v-model="documento"
                      :items="documentos"
                      label="Tipo Documento"
                    >
                    </v-select>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                      v-model="Iddocumento"
                      label="Número Documento"
                    >
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                     v-model="direccion"
                      label="Dirección">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field
                     v-model="telefono" 
                     label="Teléfono">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field 
                    v-model="email"
                     label="Email"> 
                     </v-text-field>
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
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="Modal" max-width="290">
          <v-card>
            <v-card-title class="headline" v-if="Accion == 1">
              Activar Item
            </v-card-title>
            <v-card-title class="headline" v-if="Accion == 2">
              Desactivar Item
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
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="personas"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.opciones`]="{ item,index}">
          <v-icon small class="mr-2" @click="editItem(item,index)">
            mdi-pencil
          </v-icon>
          <template v-if="item.estado">
            <v-icon small @click="actiDesaVer(2, item)">
              mdi-server-network
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="actiDesaVer(1, item)">
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
import {mapActions, mapGetters} from "vuex"
export default {
  data() {
    return {
      dialog: false,
      search: "",
      headers: [
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Tipo Persona", value: "tipoPersona", sortable: true },
        { text: "Tipo Documento", value: "documento", sortable: true },
        { text: "Número Documento", value: "Iddocumento", sortable: true },
        { text: "Dirección", value: "direccion", sortable: false },
        { text: "Teléfono", value: "telefono", sortable: false },
        { text: "Email", value: "email", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedIndex: -1,
      index:"",
      id: "",
      nombre: "",
      tipoPersona: "Proveedor",
      documento: "",
      documentos: ["CC", "NIT", "PASAPORTE", "CE"],
      Iddocumento: "",
      direccion: "",
      telefono: "",
      email: "",
      valida: 0,
      validaMensaje: [],
      Modal: 0,
      Accion: 0,
      Nombre: "",
      Id: "",
    };
  },
  computed: {
    ...mapGetters({
      personas: "allProveedores"
    }),
    tituForm() {
      return this.editedIndex === -1 ? "Nuevo registro" : "Editar registro";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.getPersona();
  }, 
  methods: {
    ...mapActions([
      "getPersona",
      "newPersona",
      "updatePersona"
    ]),
    listar() {
      let me = this;
      let header = { headers: {"token": this.$store.state.token}};
      axios
        .get("persona", header)
        .then(function (response) {
          me.personas = response.data.persona;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this._id = "";
      this.nombre = "";
      this.Iddocumento = "";
      this.direccion = "";
      this.telefono = "";
      this.email = "";
      this.valida = 0;
      this.validaMensaje = [];
      this.editedIndex = -1;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (this.nombre.length < 1 || this.nombre.length > 50) {
        this.validaMensaje.push(
          "El nombre de la persona debe tener entre 1-50 caracteres."
        );
      }
      if (this.Iddocumento.length > 20) {
        this.validaMensaje.push(
          "El documento no debe tener mas de 20 caracteres."
        );
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    guardar() {
      if (this.validar()) {
        return;
      }
      if (this.editedIndex > -1) {
        this.updatePersona({
          persona: {
            id:this.id,
            nombre: this.nombre,
            documento: this.documento,
            Iddocumento: this.Iddocumento,
            direccion: this.direccion,
            telefono: this.telefono,
            email: this.email,
            
          },
          index:this.index,
        })
      } else {
        //Codigo para guardar
        console.log('Entrando al newPerson')
        this.newPersona({
          tipoPersona: this.tipoPersona,
          nombre: this.nombre,
          documento: this.documento,
          Iddocumento: this.Iddocumento,
          direccion: this.direccion,
          telefono: this.telefono,
          email: this.email,
        })
      }
      this.close()
    },
    editItem(item,index) {
      this.id = item._id;
      this.rol = item.rol;
      this.nombre = item.nombre;
      this.documento = item.documento;
      this.Iddocumento = item.Iddocumento;
      this.direccion = item.direccion;
      this.telefono = item.telefono;
      this.email = item.email;
      this.password = item.password;
      this.dialog = true;
      this.editedIndex = 1;
      this.index = index;
      
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
    activar() {
      let me = this;
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .put(`persona/activar/${this.Id}`, { }, header)
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
     let header = { headers: { "token": this.$store.state.token } };
      axios
        .put(`persona/desactivar/${this.Id}`, { }, header)
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
    close() {
      this.dialog = false;
      this.limpiar();
    },
  },
};
</script>