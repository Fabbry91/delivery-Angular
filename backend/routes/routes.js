const router = require('express-promise-router')();


const userController = require("../controllers/userController");
const rubroController = require("../controllers/rubroController");
const articuloController = require("../controllers/articuloController");
const clienteController = require("../controllers/clienteController");
const artManofacturadoController = require("../controllers/artManofacturadoController");
const detallePedidoController = require("../controllers/detallePedidoController");
const pedidoController = require("../controllers/pedidoController");
const facturaController = require("../controllers/facturaController");


//Router User
const userStr = "/user";
router.get(userStr, userController.getAll);
router.get(userStr + "/:id", userController.getOne);
router.post(userStr, userController.insertUser);
router.post(userStr + "/email", userController.getbyEmail);
router.put(userStr + "/:id", userController.updateUser);
router.delete(userStr + "/:id", userController.deleteUser);

//Router Rubro
const rubroStr = "/rubro";
router.get(rubroStr, rubroController.getAll);
router.get(rubroStr + "/:id", rubroController.getOne);
router.post(rubroStr, rubroController.insertRubro);
router.put(rubroStr + "/:id", rubroController.updateRubro);
router.delete(rubroStr + "/:id", rubroController.deleteRubro);


//Router Articulo
const articuloStr = "/articulo";
router.get(articuloStr, articuloController.getAll);
router.get(articuloStr + "/:id", articuloController.getOne);
router.get("/totalsales", articuloController.getTotalSales);
router.post(
  articuloStr + "/decreasestock",
  articuloController.decreaseStockArticulo
);
router.post(articuloStr, articuloController.insertArticulo);
router.post(articuloStr + "/byquery", articuloController.getByQuery);
router.put(articuloStr + "/:id", articuloController.updateArticulo);
router.delete(articuloStr + "/:id", articuloController.deleteArticulo);

const artManofacturadoStr = "/manofacturado";
router.get(artManofacturadoStr, artManofacturadoController.getAll);
router.get(artManofacturadoStr + "/:id", artManofacturadoController.getOne);
router.post(
  artManofacturadoStr,
  artManofacturadoController.insertArticuloManofacturado
);
router.put(
  artManofacturadoStr + "/:id",
  artManofacturadoController.updateArticuloManofacturado
);
router.delete(
  artManofacturadoStr + "/:id",
  artManofacturadoController.deleteArticuloManofacturado
);

//Router Cliente
const clienteStr = "/cliente";
router.get(clienteStr, clienteController.getAll);
router.get(clienteStr + "/:id", clienteController.getOne);
router.get(clienteStr + "/byemail/:email", clienteController.getClientByEmail);
router.post(clienteStr + "/byquery/", clienteController.getClientByQuery);
router.post(clienteStr, clienteController.insertCliente);
router.put(clienteStr + "/:id", clienteController.updateCliente);
router.delete(clienteStr + "/:id", clienteController.deleteCliente);

//Router Detalle Pedido
const detallePedidoStr = "/detallepedido";
router.get(detallePedidoStr, detallePedidoController.getAll);
router.get(detallePedidoStr + "/:id", detallePedidoController.getOne);
router.post(detallePedidoStr, detallePedidoController.insertDetallePedido);
router.put(
  detallePedidoStr + "/:id",
  detallePedidoController.updateDetallePedido
);
router.delete(
  detallePedidoStr + "/:id",
  detallePedidoController.deleteDetallePedido
);

//Router Pedido
const pedidoStr = "/pedido";
router.get(pedidoStr, pedidoController.getAll);
router.get(pedidoStr + "/:id", pedidoController.getOne);
router.post("/pedidobycliente/", pedidoController.getByCliente);
router.post(pedidoStr, pedidoController.insertPedido);
router.post(pedidoStr + "/byquery/", pedidoController.getByQuery);
router.put(pedidoStr + "/:id", pedidoController.updatePedido);
router.delete(pedidoStr + "/:id", pedidoController.deletePedido);

//Router Facturas
const FacturaStr = "/Factura";
router.get(FacturaStr, facturaController.getAll);
router.get(FacturaStr + "/:id", facturaController.getOne);
router.post(FacturaStr + "/byquery/", facturaController.getByQuery);
router.post(FacturaStr, facturaController.insertFactura)

module.exports = router;