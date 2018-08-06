describe('Vehicle', function() {
  beforeEach(function() {
    this.vehicle = new Vehicle({make: 'Ford', model: 'F-150'});
  });

  it('sets the make and model properties when an object is passed in', function() {
    expect(this.vehicle.make).toEqual('Ford');
    expect(this.vehicle.model).toEqual('F-150');
  });

  it('returns a concatenated string with make and model', function() {
    expect(this.vehicle.toString()).toEqual('Ford F-150');
    this.vehicle.make = 'Toyota';
    this.vehicle.model = 'Prius';
    expect(this.vehicle.toString()).toEqual('Toyota Prius');
  });

  it('returns a message when the horn is honked', function() {
    expect(this.vehicle.honkHorn()).toMatch(/Beep beep!/);
  });
});