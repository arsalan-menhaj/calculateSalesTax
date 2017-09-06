function add(a, b) {
    return a + b;
}

function sum(array) {
  return array.reduce(add, 0);
}

function calculateSalesTax(salesData, taxRates) {
  var total = [];
  var tracker = {}; // Object used to track if an entry for a Company has already been made

  for ( i = 0 ; i < salesData.length ;  i++ ) {

    //checks if Company object already exists in array
    if (!tracker[salesData[i].name]) {
      total[i] = {};
      total[i][salesData[i].name] = {};
      total[i][salesData[i].name]["Total Sales"] = sum(salesData[i].sales);
      total[i][salesData[i].name]["Total Taxes"] = taxRates[salesData[i].province] * sum(salesData[i].sales);
      tracker[salesData[i].name] = true;
    } else {
      for ( j = 0 ; j < i ;  j++ ) {
        // If Company object already exists, adds Sales and Tax values to existing object
        if ( Object.keys(total[j])[0] === salesData[i].name ) {
          total[j][salesData[i].name]["Total Sales"] += sum(salesData[i].sales);
          total[j][salesData[i].name]["Total Taxes"] += taxRates[salesData[i].province] * sum(salesData[i].sales);
        }
      }
    }
  }
  console.log(total);
}


// Test Code

var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

calculateSalesTax(companySalesData,salesTaxRates);