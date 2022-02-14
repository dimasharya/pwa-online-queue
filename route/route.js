var router = require("express").Router();
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("../utils/antrianonline-5bd8a-firebase-adminsdk-lwvey-2d22dbceb9.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

router.get("/api/tenant", async (req, res) => {
  const snapshot = await db.collection("antrian").get();
  snapshot.forEach((doc) => {
    console.log(doc.id, "=>", doc.data());
  });
});
