<template>
<nav class="container">
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Ventas</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <button @click="crearPDF"><v-icon> mdi-printer-check</v-icon></button>
        <v-spacer></v-spacer>
        <v-text-field
          v-if="verNuevo == 0"
          class="text-xs-center"
          v-model="search"
          append-icon="mdi-magnify"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          v-if="verNuevo == 0"
          @click="mostrarNuevo()"
          dark
          class="mb-2"
          >Nuevo</v-btn
        >
        <v-dialog v-model="dialog" max-width="1000px">
          <v-card>
            <v-card-title>
              <span class="headline">Seleccione un artículo</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field
                      v-model="texto"
                      @keyup.enter="listarArticulos()"
                      class="text-xs-center"
                      append-icon="mdi-magnify"
                      label="Búsqueda"
                    ></v-text-field>
                    <template class="container">


                      <!-- SUB MENU PARA INGRESAR ARTICULOS -->
                      <v-data-table
                        :headers="cabeceraArticulos"
                        :items="articulos"
                        class="elevation-1"
                      >
                        <template v-slot:[`item.seleccionar`]="{ item }">
                          <template v-if="item.estado">
                            <v-icon 
                            small
                             @click="agregarDetalle(item)">
                              mdi-plus
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
                      </v-data-table>
                      <!-- FINAL DEL SUB MENU  -->


                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
              color="primary"
              flat
              @click="close">
              Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- INICIO DE ACTIVAR Y DESACTIVAR  -->
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
                @click="activarDesactivarCerrar()"
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
        <!-- FINAL DE ACTIVAR Y DESACTIVAR  -->
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="ventas"
        :search="search"
        class="elevation-1"
        v-if="verNuevo == 0"
      >
      <!-- INICIO DE BOTONES DE TABLAS  -->
        <template v-slot:[`item.opciones`]="{ item }">
          <template v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(2, item)">
              mdi-server-network
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(1, item)">
              mdi-server-off
            </v-icon>
          </template>
          <!-- FIN DE BOTONES DE TABLAS -->
          
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
      <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
        <v-layout row wrap>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-select
              v-model="tipoComprobante"
              :items="comprobantes"
              label="Tipo Comprobante"
            >
            </v-select>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field 
            v-model="serieComprobante" 
            label="Serie Comprobante">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field 
            v-model="numComprobante" 
            label="Número Comprobante">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-select  
            :items="personas" 
            v-model="persona"
             label="Cliente"
             >
            </v-select>

          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field 
            type="number" 
            v-model="impuesto" 
            label="Impuesto">
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm8 md8 lg8 x8>
            <v-text-field
              v-model="codigo"
              label="Código"
              @keyup.enter="buscarCodigo()"
            >
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 xl2>
            <!-- BOTON PARA AGREGAR ARTICULO  -->

            <v-btn 
            small 
            fab
             dark 
             color="primary" 
             @click="mostrarModalArticulos()">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-flex>
          <!-- FIN DE BOTON PARA AGREGAR ARTICULO  -->
          <v-flex xs12 sm2 md2 lg2 xl2 v-show="errorArticulo">
            <div class="red--text" v-text="errorArticulo"></div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>

            <!-- INICIO PARA AGREGAR ARTICULOS  -->
            <template>
              <v-data-table
                :headers="cabeceraDetalles"
                :items="detalles"
                hide-actions
                class="elevation-1"
              >
                <template v-slot:[`item.borrar`]="{ item }">
                  <template>
                    <v-icon small @click="eliminarDetalle(detalles, item)">
                      mdi-delete
                    </v-icon>
                  </template>
                </template>
                <template v-slot:[`item.cantidad`]="{ item }">
                  <template>
                    <v-text-field
                      v-model="item.cantidad"
                      type="number"
                    ></v-text-field>
                  </template>
                </template>
                <template v-slot:[`item.descuento`]="{ item }">
                  <template>
                    <v-text-field
                      v-model="item.descuento"
                      type="number"
                    ></v-text-field>
                  </template>
                </template>
                <template v-slot:[`item.subtotal`]="{ item }">
                  <template>
                    <v-text
                      v-text="item.precio * item.cantidad - item.descuento"
                    ></v-text>
                  </template>
                </template>

                <template slot="no-data">
                  <h3>No hay artículos agregados al detalle.</h3>
                </template>
              </v-data-table>
              <!-- FIN PARA AGREGAR ARTICULOS  -->

              <v-flex class="text-xs-right">
                <strong>Total Parcial:</strong> $
                {{ (totalParcial = (total - totalImpuesto).toFixed(2)) }}
              </v-flex>
              <v-flex class="text-xs-right">
                <strong>Total Impuesto:</strong> $
                {{
                  (totalImpuesto = (
                    (total * impuesto) /
                    (1 + impuesto)
                  ).toFixed(2))
                }}
              </v-flex>
              <v-flex class="text-xs-right">
                <strong>Total Neto:</strong> $ {{ (total = calcularTotal) }}
              </v-flex>
            </template>

            <!-- FIN DE CABECERA DE DETALLES  -->
          </v-flex>
          <v-flex xs12 sm12 md12 v-show="valida">
            <div
              class="red--text"
              v-for="v in validaMensaje"
              :key="v"
              v-text="v"
            ></div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="primary" flat @click.native="ocultarNuevo()"
              >Cancelar</v-btn
            >
            <v-btn
              color="primary"
              v-if="verDetalle == 0"
              @click.native="guardar()"
              >Guardar</v-btn
            >
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
  </nav>
</template>
<script>
import axios from "axios";
import jsPDF from "jspdf";
import 'jspdf-autotable'
export default {
  data() {
    return {
      dialog: false,
      search: "",
      ventas: [],
      headers: [
        { text: "Usuario", value: "usuario.nombre", sortable: false },
        { text: "Cliente", value: "persona.nombre", sortable: true },
        { text: "Tipo Comprobante", value: "tipoComprobante", sortable: true },
        {text: "Serie comprobante", value: "serieComprobante", sortable: false},
        {text: "Número comprobante",value: "numComprobante",sortable: false},
        { text: "Fecha", value: "createdAt", sortable: false },
        { text: "Impuesto", value: "impuesto", sortable: false },
        { text: "Total", value: "total", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      id: "",
      persona: "",
      personas: [],
      tipoComprobante: "",
      comprobantes: ["NOTA DEBITO", "FACTURA", "NOTA CREDITO"],
      serieComprobante: "",
      numComprobante: "",
      impuesto: 0.19,
      codigo: "",
      cabeceraDetalles: [
        { text: "Borrar", value: "borrar", sortable: false },
        { text: "Artículo", value: "articulo", sortable: false },
        { text: "Cantidad", value: "cantidad", sortable: false },
        { text: "Precio", value: "precio", sortable: false },
        { text: "Descuento", value: "descuento", sortable: false },
        { text: "Sub Total", value: "subtotal", sortable: false },
      ],
      detalles: [],
      verNuevo: 0,
      errorArticulo: null,
      total: 0,
      totalParcial: 0,
      totalImpuesto: 0,
      texto: "",
      articulos: [],
      cabeceraArticulos:[
        { text: "Seleccionar", value: "seleccionar", sortable: false },
        { text: "Código", value: "codigo", sortable: false },
        { text: "Nombre", value: "nombre", sortable: true },
        { text: "Categoría", value: "categoria.nombre", sortable: true },
        { text: "Stock", value: "stock", sortable: false },
        { text: "Precio Venta", value: "precioventa", sortable: false },
        { text: "Descripción", value: "descripcion", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      verDetalle: 0,
      valida: 0,
      validaMensaje: [],
      Modal: 0,
      Accion: 0,
      Nombre: "",
      Id: "",
      fecha: null,
    };
  },
  computed: {
    calcularTotal: function () {
      let resultado = 0.0;
      for (var i = 0; i < this.detalles.length; i++) {
        resultado =
          resultado +
          this.detalles[i].cantidad * this.detalles[i].precio -
          this.detalles[i].descuento;
      }
      return resultado;
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.listar();
    this.selectPersona();
  },
  methods: {
     crearPDF() {
      var columns = [
        { title: "Usuario", dataKey:"usuario",  },
        { title: "Persona", dataKey: "persona",  },
        { title: "Tipo Comprobante", dataKey: "tipoComprobante"},
        {title: "Serie comprobante", dataKey: "serieComprobante"},
        {title: "Número comprobante",dataKey: "numComprobante"},
        {title: "Impuesto", dataKey: "impuesto" },
        { title:"Total", dataKey: "total" },
        
      ];
      var rows = [];
      this.ventas.map(function (x) {
        rows.push({
        usuario: x.usuario,
        persona: x.persona,
        tipoComprobante:x.tipoComprobante,
        serieComprobante: x.serieComprobante,
        numComprobante:x.numComprobante,
        impuesto:x.impuesto,
        total:x.total,
        }); 
      });
      var doc = new jsPDF("p","pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de Ventas", 40, 30);
        },
      });

      doc.save("Ventas.pdf");
    },

    selectPersona() {
      let me = this;
      let personaArray = [];
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .get("persona", header)
        .then(function (response) {
          personaArray = response.data.persona;
          personaArray.map(function (x) {
            me.personas.push({ text: x.nombre, value: x._id });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    listarArticulos() {
      let me = this;
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .get("articulo", header)
        .then(function (response) {
          console.log(response.data.articulo);
          me.articulos = response.data.articulo;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    mostrarModalArticulos() {
      this.dialog = 1;
      this.listarArticulos()
    },
    agregarDetalle(data) {
      console.log(data);
      this.errorArticulo = null;
      if (this.encuentra(data._id) == true) {
        this.errorArticulo = "El artículo ya ha sido agregado.";
      } else {
        this.detalles.push({
          _id: data._id,
          articulo: data.nombre,
          cantidad: 1,
          precio: data.precioventa,
          descuento: 0,
        });
        this.codigo = "";
      }
    },
    encuentra(id) {
      let sw = 0;
      for (var i = 0; i < this.detalles.length; i++) {
        if (this.detalles[i]._id == id) {
          sw = true;
        }
      }
      return sw;
    },
    eliminarDetalle(arr, item) {
      console.log(arr, "   /   ", item);
      let i = arr.indexOf(item);
      if (i != -1) {
        arr.splice(i, 1);
      }
    },
    
    listarDetalles(id) {
      let me = this;
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .get(`venta/${id}`, header)
        .then(function (response) {
          me.detalles = response.data.venta.detalles;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    listar() {
      let me = this;
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .get("venta", header)
        .then(function (response) {
          me.ventas = response.data.venta;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    limpiar() {
      this.id = "";
      this.tipoComprobante = "";
      this.serieComprobante = "";
      this.numComprobante = "";
      this.impuesto = 0.18;
      this.codigo = "";
      this.total = 0;
      this.totalParcial = 0;
      this.totalImpuesto = 0;
      this.detalles = [];
      this.verNuevo = 0;
      this.valida = 0;
      this.validaMensaje = [];
      this.verDetalle = 0;
    },
    validar() {
      this.valida = 0;
      this.validaMensaje = [];
      if (!this.persona) {
        this.validaMensaje.push("Seleccione un Cliente.");
      }
      if (!this.numComprobante) {
        this.validaMensaje.push("Ingrese el número del comprobante.");
      }
      if (this.validaMensaje.length) {
        this.valida = 1;
      }
      return this.valida;
    },
    mostrarNuevo() {
      this.verNuevo = 1;
    },
    ocultarNuevo() {
      this.verNuevo = 0;
      this.limpiar();
    },
    guardar() {
      let me = this;
      let header = { headers: { "token": this.$store.state.token } };
      if (this.validar()) {
        return;
      }
      //Código para guardar
      axios
        .post(
          "venta",
          {
            persona: this.persona,
            usuario: this.$store.state.usuario._id,
            tipoComprobante: this.tipoComprobante,
            serieComprobante: this.serieComprobante,
            numComprobante: this.numComprobante,
            impuesto: this.impuesto,
            total: this.total,
            detalles: this.detalles,
          },
          header
        )
        .then(function () {
          me.limpiar();
          me.close();
          me.listar();
        })
        .catch(function (error) {
          console.log(error.response);
        });
    },
    activarDesactivarMostrar(accion, item) {
      this.Modal = 1;
      this.Nombre = item.numComprobante;
      this.Id = item._id;
      if (accion == 1) {
        this.Accion = 1;
      } else if (accion == 2) {
        this.Accion = 2;
      } else {
        this.Modal = 0;
      }
    },
    activarDesactivarCerrar() {
      this.Modal = 0;
    },
    activar() {
      let me = this;
      let header = { headers: { "token": this.$store.state.token } };
      axios
        .put(`venta/activar/${this.Id}`, {}, header)
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
        .put(`venta/desactivar/${this.Id}`, {}, header)
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
    },
  },
};
</script> 