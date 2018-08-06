describe('Honda', function() {

  it('inherits the Vehicle prototype', function() {
    var car = new Honda('CR-V');
    expect(car.toString()).toEqual('Honda CR-V');
  });

  it('sets the model property when a valid model is passed in', function() {
    var car = new Honda('Fit');
    expect(car.make).toEqual('Honda');
    expect(car.model).toEqual('Fit');
  });

  it('throws an error if an invalid model is passed in', function() {
    var createInvalidHonda = function() { 
      new Honda('Fir'); 
    }
    expect(createInvalidHonda).toThrowError(/Fir/);
  });

  it('returns a list of valid models', function() {
    expect(Honda.getModels().length).toBeDefined();
    expect(Honda.getModels()).toContain('Insight');
  });

  it('calls getPrice when a new car is created', function() {
    spyOn(Honda, 'getPrice');
    var car = new Honda('Pilot');
    expect(Honda.getPrice).toHaveBeenCalled();
    expect(Honda.getPrice).toHaveBeenCalledWith('Pilot');
  });

  it('returns a price for the passed in model', function() {
    expect(Honda.getPrice('Accord')).toBeGreaterThan(0);
  });

  it('returns a price less than 15000 when a Civic is created', function() {
    var civic = new Honda('Civic');
    expect(civic.price).toBeLessThan(15000);
  });

  it('returns a price greater than 10000 when a CR-Z is created', function() {
    var crz = new Honda('CR-Z');
    expect(crz.price).toBeGreaterThan(10000);
  });

});


