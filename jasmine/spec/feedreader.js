/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

$(function() {

    
    describe('RSS Feeds', function() {

        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toBeNonEmptyString();
            }
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('Names are defined', function() {
            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).toBeNonEmptyString();
            }
        });
         

    });


    describe('The menu', function() {
        var btn = $(".menu-icon-link");

        /* TODO: Write a test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */
        it('is displayed/hidden when clicked', function() {

            btn.click();
            expect($("body").hasClass("menu-hidden")).toBe(false);

            btn.click();
            expect($("body").hasClass("menu-hidden")).toBe(true);
            
            
        });
    });

    describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('are loaded', function() {
            expect($(".feed .entry").length).toBeGreaterThanOrEqualTo(1);
        });
         

    });

    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var entryOne,
            entryTwo;

        beforeEach(function(done) {
            loadFeed(0, function() {
                entryOne = $(".feed").text();

                loadFeed(1, function() {
                    entryTwo = $(".feed").text();
                    done();
                });
            });
        });

        it('content is changed', function(done) {
            expect(entryOne).not.toEqual(entryTwo);
            done();
        });

    });

}());

