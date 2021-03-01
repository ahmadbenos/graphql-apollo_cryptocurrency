const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const path = require("path");
const schema = require("./schema");
const app = express();

app.use(require("cors")());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
