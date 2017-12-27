/* global Gif Giffery */
const gifferyId = 'giffery';
describe('Giffery object', () => {
  function createTestGif() {
    const staticImg = 'http://media2.giphy.com/media/FiGiRei2ICzzG/giphy_s.gif';
    const animatedImg = 'http://media2.giphy.com/media/FiGiRei2ICzzG/giphy.gif';
    const rating = 'g';
    const html = '<figure><div class="gif-container"><img></div>' +
      '<figcaption>Rating: <span class="rating"></span></figcaption></figure>';
    return new Gif(html, staticImg, animatedImg, rating);
  }
  // Returns div with id of 'giffery' in $fixtures. Creates the element if it doesn't exist.
  function gifferyDiv() {
    const div = document.getElementById(gifferyId) || document.createElement('div');
    div.id = gifferyId;
    $fixtures.append(div);
    return div;
  }
  describe('constructor', () => {
    beforeEach(() => {
      $fixtures.empty();
      gifferyDiv();
    });
    it('throws if selector does not match an element in the DOM', () => {
      expect(() => new Giffery('#notFound')).to.throw();
    });
    it('has jquery instance with at least one element in the collection', () => {
      const myGiffery = new Giffery(`#${gifferyId}`);
      expect(myGiffery.$).to.be.an.instanceof($);
      expect(myGiffery.$.length).to.equal(1);

    });
    it('has an empty gifs array by default', () => {
      const myGiffery = new Giffery(`#${gifferyId}`);
      expect(myGiffery).to.have.a.property('gifs');
      expect(myGiffery.gifs).to.be.an('array');
      expect(myGiffery.gifs.length).to.equal(0);
    });
    describe('if passed an array of gifs', () => {
      beforeEach(() => {
        $fixtures.empty();
        gifferyDiv();
      });
      it('throws if any element in the passed array is not a Gif instance', () => {
        expect(() => new Giffery(`#${gifferyId}`, [{ test: 'test' }, createTestGif()])).to.throw();
      });
      it('does not throw if an empty array is passed', () => {
        expect(() => new Giffery(`#${gifferyId}`, [])).to.not.throw();
      });
      it('the gifs array is populated with the gifs', () => {
        const gif1 = createTestGif();
        const gif2 = createTestGif();
        const giffery = new Giffery(`#${gifferyId}`, [gif1, gif2]);
        expect(giffery.gifs.length).to.equal(2);
        expect(giffery.gifs).to.have.members([gif1, gif2]);
      });
      it('all the gifs are added to the DOM', () => {
        const gif1 = createTestGif();
        const gif2 = createTestGif();
        new Giffery(`#${gifferyId}`, [gif1, gif2]);
        expect($(`#${gifferyId}`).children().length).to.equal(2);
      });
    });
  });
  describe('addGif', () => {
    // reset fixtures and get a new gif before each test
    let myGiffery = null;
    beforeEach(() => {
      $fixtures.empty().hide();
      gifferyDiv();
      myGiffery = new Giffery(`#${gifferyId}`);
    });

    it('adds a new Gif instance to the gifs array', () => {
      const gif = createTestGif();
      myGiffery.addGif(gif);
      expect(myGiffery.gifs).to.include(gif);
    });
    it('returns the new Gif instance', () => {
      const gif = createTestGif();
      expect(myGiffery.addGif(gif)).to.equal(gif);
    });
    it('appends the new Gif to the #giffery element', () => {
      const gif = createTestGif();
      myGiffery.addGif(gif);
      expect($fixtures.find(gif.$el).length).to.equal(1);
    });
  });
});
// const gifferyId = '#giffery';
// const gifferyDiv = () => {
//   const div = document.createElement('div');
//   div.id = 'giffery';
//   return div;
// };
// describe('Giffery', function () {
  // this.timeout(4000);
  // it('has a gifferyId property', () => {
  //   expect(giffery).to.have.property('gifferyId');
  // });
  // it('has a handleClick method', () => {
  //   expect(giffery).to.have.property('handleClick');
  //   expect(giffery.handleClick).to.be.a('function');
  // });
  // it('has a render method', () => {
  //   expect(giffery).to.have.property('render');
  //   expect(giffery.render).to.be.a('function');
  // });
  // it('has a toggleGif method', () => {
  //   expect(giffery).to.have.property('toggleGif');
  //   expect(giffery.toggleGif).to.be.a('function');
  // });
  // it('has a gifs property that is an array', () => {
  //   expect(giffery).to.have.a.property('gifs');
  //   expect(giffery.gifs).to.be.an('array');
  // });
  // describe('addGif method', () => {
  //   let gif = null;
  //   const staticImg = mockResponse.data[0].images.fixed_height_still.url;
  //   const animatedImg = mockResponse.data[0].images.fixed_height.url;
  //   const rating = mockResponse.data[0].rating;

  //   // reset fixtures and get a new gif before each test
  //   beforeEach(() => {
  //     $fixtures.empty().hide().append(gifferyDiv);
  //     expect($fixtures.children().length).to.equal(1);
  //     gif = new Gif(templates.gifFigure, staticImg, animatedImg, rating);
  //     giffery.gifs = [];
  //   });

  //   it('adds a new Gif instance to the gifs array', () => {
  //     giffery.addGif(gif);
  //     expect(giffery.gifs).to.include(gif);
  //   });
  //   it('returns the new Gif instance', () => {
  //     expect(giffery.addGif(gif)).to.equal(gif);
  //   });
  //   it('appends the new Gif to the #giffery element', () => {
  //     giffery.addGif(gif);
  //     expect($fixtures.find(gif.$el).length).to.equal(1);
  //   });
  // });
  // describe('render method', () => {
  //   // add a giffery fixture to the page
  //   before(() => {
  //     expect(giffery.gifferyId).to.equal(gifferyId);
  //     $fixtures
  //       .empty()
  //       .hide()
  //       .append(gifferyDiv());
  //     expect($fixtures.has(gifferyId).length).to.equal(1);
  //   });
  //   after(() => {
  //     $fixtures.empty().show();
  //   });
  //   it('adds images for Giphy API response to #giffery element', (done) => {
  //     // render the mock
  //     expect(() => giffery.render(mockResponse)).to.not.throw();
  //     // wait for animations to finish
  //     setTimeout(() => {
  //       // compare count of images in giffery to images in mock
  //       expect($(gifferyId).find('img').length).to.equal(mockResponse.data.length);
  //       done();
  //     }, 300);
  //   });
  // });
  // describe('toggleGif method', () => {
  //   before((done) => {
  //     // render mock images and ensure they are present
  //     $fixtures.empty().hide().append(gifferyDiv());
  //     giffery.render(mockResponse);
  //     setTimeout(() => {
  //       expect($fixtures.find('img').size()).to.be.at.least(1);
  //       done();
  //     }, 250);
  //   });
  //   // after(() => $fixtures.empty().show());
  //   it('toggles the src attribute on an image', () => {
  //     const imgEl = $fixtures.find('img').get(0);
  //     const startingSrc = imgEl.src;
  //     expect(() => giffery.toggleGif(imgEl)).to.not.throw();
  //     expect(imgEl.src).to.not.be.empty;
  //     expect(imgEl.src).to.not.be.undefined;
  //     expect(imgEl.src).to.not.be.equal(startingSrc); 
  //   });
  // });
// });
