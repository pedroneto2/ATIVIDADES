const BillingCycle = require("./billingCycle");
const errorHanlder = require("../common/errorHandler");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after("post", errorHanlder).after("put", errorHanlder);

BillingCycle.route("count", (req, res, next) => {
  BillingCycle.count((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

BillingCycle.route("summary", (req, res, next) => {
  BillingCycle.aggregate(
    [
      {
        $project: {
          credit: { $sum: "$credits.value" }, // aqui ele soma os creditos de cada registro
          debt: { $sum: "$debts.value" },
        },
      },
      {
        $group: {
          //agrupamento das somas
          _id: null,
          credit: { $sum: "$credit" }, // aqui ele soma a soma dos creditos de cada registro
          debt: { $sum: "$debt" },
        },
      },
      {
        //resultado exibido
        $project: { _id: 0, credit: 1, debt: 1 }, //1 seria true e 0 false
      },
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json(result[0] || { credit: 0, debt: 0 });
      }
    }
  );
});

module.exports = BillingCycle;
