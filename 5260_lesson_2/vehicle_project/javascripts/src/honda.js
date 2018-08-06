function Honda(model) {
  if (this.verify(model)) {
    Vehicle.call(this, {make: "Honda", model: model});
    this.price = Honda.getPrice(model);
  } else {
    throw new Error('Model ' + model + ' does not exist.');
  }
}

Honda.prototype = Object.create(Vehicle.prototype);

Honda.prototype.constructor = Honda;

Honda.prototype.verify = function(model) {
  return Honda.getModels().includes(model);  
};

Honda.getModels = function() {
  var models = ["Accord", "Civic", "Crosstour", "CR-V", "CR-Z", "Fit", "HR-V", "Insight", "Odyssey", "Pilot"];
  return models.slice();
}

Honda.getPrice = function(model) {
  var prices = [16500, 14500, 21000, 15800, 12000, 13100, 16000, 18100, 22500, 19300];
  var index = Honda.getModels().indexOf(model);
  return prices[index] || 0;
};

