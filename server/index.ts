import { app } from "./app";
import { connect } from "./configs/db";
// Connect To Database
connect()
  .then()
  .catch((e: any) => console.log(e));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

