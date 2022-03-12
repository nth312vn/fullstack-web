const express = require("express");
const homeController = require("../controlers/homeController");
let router = express.Router();
let userController = require("../controlers/userController");
let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/crud", homeController.getCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.put("/api/edit-user", userController.handleEditUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
