describe("Albums View", function() {
  beforeEach(function() {
    this.view = new AlbumsView({ collection: albumsScaffold });
  });

  it("should have a collection's property assigned", function() {
    expect(this.view.collection).toBeDefined();
    expect(this.view.collection.length).toBe(albumsScaffold.length);
  });

  it("should have a compiled Handlebars template", function() {
    expect(this.view.template).toBeDefined();
  });

  it("should render to an #albums container when render called", function() {
    this.view.render();
    expect($('#albums li').length).toBe(albumsScaffold.length);
  });

  it("should re-render view when collection changes", function() {
    var model = albumsScaffold.findWhere({ artist: 'Taylor Swift' });
    var originalHtml;
    var newHtml;

    this.view.render();
    originalHtml = $('#albums').html();
    model.set('title', 'Bob Dylan');
    newHtml = $('#albums').html();
    expect(originalHtml).not.toEqual(newHtml);
  });
});