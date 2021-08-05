<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="venta"
        sort-by="nombre"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Ventas</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="teal accent-3"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                  @click="
                    editedItem = {};
                    x = 0;
                  "
                >
                  Nuevo
                </v-btn>
                <v-btn
                  color="teal accent-3"
                  class="mb-2"
                  dark
                  @click="crearPDF()"
                  >Imprimir</v-btn
                >
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ titulo }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.usuario"
                          label="Usuario"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.persona"
                          label="Persona"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.tipoComprobante"
                          label="Tipo Comprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.serieComprobante"
                          label="Serie Comprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.numComprobante"
                          label="Número Comprobante"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.impuesto"
                          label="Impuesto"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.total"
                          label="Total"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.state"
                          label="Estado"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="guardar">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="300px">
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancelar</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >Guardar</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.opciones`]="{ item }">
          <v-icon
            color="teal accent-3"
            small
            class="mr-2"
            @click="editar(item)"
          >
            mdi-pencil
          </v-icon>
          <template v-if="item.estado">
            <v-icon small @click="activarDesactivarMostrar(2, item)">
              mdi-block-helper
            </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="activarDesactivarMostrar(1, item)">
              mdi-check
            </v-icon>
          </template>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default {
  data() {
    return {
      x: 0,
      ventas: [],
      dialog: false,
      headers: [
        {align: "start",sortable: false,value: "nombre"},
        { text: "Usuario", value: "usuario.nombre" },
        { text: "Persona", value: "persona.nombre" },
        { text: "Tipo Comprobante", value: "tipoComprobante" },
        { text: "Serie Comprobante", value: "serieComprobante" },
        { text: "Número Comprobante", value: "numComprobante" },
        { text: "Impuesto", value: "impuesto" },
        { text: "Total", value: "total" },
        { text: "Estado", value: "state" },
        { text: "Opciones", value: "opciones", sortable: false },
      ],
      editedItem: {
        usuario: 0,
        persona: 0,
        tipoComprobante: 0,
        serieComprobante: 0,
        numComprobante: 0,
        impuesto: 0,
        total: 0,
        state: 0,
      },
    };
  },
  computed: {
    titulo() {
      return this.x == 0 ? "Nuevo" : "Editar";
    },
  },
  created() {
    this.listar();
  },
  methods: {
    listar() {
      const me = this;
      axios
        .get(`venta`, me.$store.getters.header)
        .then(function (response) {
          me.venta = response.data.venta;
        })
        .catch();
    },
    guardar() {
      if (this.x == 0) {
        console.log("Estoy guardando" + this.x);
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .post(
            "venta",
            {
              usuario: this.editedItem.usuario,
              persona: this.editedItem.persona,
              tipoComprobante: this.editedItem.tipoComprobante,
              serieComprobante: this.editedItem.serieComprobante,
              numComprobante: this.editedItem.numComprobante,
              impuesto: this.editedItem.impuesto,
              total: this.editedItem.total,
              state: this.editedItem.state,
            },
            header
          )
          .then((response) => {
            console.log(response);
            me.listar();
            this.dialog = false;
          })
          .catch((error) => {
            console.log(error.response);
          });
      } else {
        let header = { headers: { token: this.$store.state.token } };
        const me = this;
        axios
          .put(
            `venta/${me.id}`,
            {
              usuario: me.editedItem.usuario,
              persona: me.editedItem.persona,
              tipoComprobante: me.editedItem.tipoComprobante,
              serieComprobante: me.editedItem.serieComprobante,
              numComprobante: me.editedItem.numComprobante,
              impuesto: me.editedItem.impuesto,
              total: me.editedItem.total,
              state: me.editedItem.state,
            },
            header
          )
          .then(function () {
            me.listar();
            me.dialog = false;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    editar(item) {
      this.x = 1;
      console.log(item);
      this.id = item._id;
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
     crearPDF() {
      var columns = [
        { title: "usuario", dataKey: "usuario" },
        { title: "persona", dataKey: "persona" },
        { title: "tipoComprobante", dataKey: "tipoComprobante" },
        { title: "serieComprobante", dataKey: "serieComprobante" },
        { title: "numComprobante", dataKey: "numComprobante" },
        { title: "impuesto", dataKey: "impuesto" },
        { title: "total", dataKey: "total" },
        { title: "state", dataKey: "state" },
      ];
      var rows = [];
      this.venta.map(function (x) {
        rows.push({
          usuario: x.usuario,
          persona: x.persona,
          tipoComprobante: x.tipoComprobante,
          serieComprobante: x.serieComprobante,
          numComprobante: x.numComprobante,
          impuesto: x.impuesto,
          total: x.total,
          state: x.state,
        });
      });
      var doc = new jsPDF("p", "pt");
      doc.autoTable(columns, rows, {
        margin: { top: 60 },
        addPageContent: function () {
          doc.text("Lista de ventas", 40, 30);
        },
      });

      doc.save("Articulos.pdf");
    },
    activarDesactivarMostrar(accion, item) {
      let id = item._id;
      console.log(accion);
      if (accion == 2) {
        console.log(id);
        let me = this;
        let header = { headers: { "token": this.$store.state.token } };
        axios
          .put(
            `venta/desactivar/${id}`,
            {
              estado: 0,
            },
            header
          )
          .then(function () {
            me.listar();
            console.log("Hola")
          })
          .catch(function (error) {
            console.log(error);
          });
      } else if (accion == 1) {
        console.log(id);
        let me = this;
        let header = { headers: { "token": this.$store.state.token } };
        axios
          .put(
            `venta/activar/${id}`,
            {
              estado: 1,
            },
            header
          )
          .then(function () {
            me.listar();
            console.log("Bienvenido")
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
  },
};
</script>