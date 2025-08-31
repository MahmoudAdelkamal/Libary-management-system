import { sequelize } from "./shared/db/db_ctx.js";
import { configs } from "./shared/utils/config.js";
import app from "./server.js";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const PORT = configs.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
