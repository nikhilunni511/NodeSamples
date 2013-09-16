/**
 * @author TonyGuu
 */
describe('Connection', function() {
			var db = new Connection();
			var	tobi = new User('tobi'); 
			var	loki = new User('loki');
			var jane = new User('jane');

			beforeEach(function(done) {
				db.clear(function(err) {
					if (err) return done(err);
					db.save([ tobi, loki, jane ], done);
				});
			});

			describe('#find()', function() {
				it('respond with matching records', function(done) {
					db.find({type : 'User'}, function(err, res) {
						if (err) return done(err);
						res.should.have.length(3);
						done();
					});
				});
			});
		});