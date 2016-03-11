(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.Raw('<div>\n		<div id="wrapper">\n			<nav class="navbar navbar-inverse navbar-fixed-top" ng-controller="NavbarCtrl">\n				<div class="container-fluid">\n					<div class="navbar-header">\n						<a class="navbar-brand" href="#">Mobile Gestures</a>\n					</div>\n				</div>\n			</nav> \n\n			<br><br>\n\n			<div layout="column" class="content-wrapper" id="primary-col">\n				<br>\n				<div class="container-fluid">\n					<div class="row">\n\n						<div class="col-sm-3">\n							<div class="panel panel-primary" id="hammer-gesture">\n								<div class="panel-heading">Hammer</div>\n								<div class="panel-body">Hammer Gesture</div>\n							</div>\n						</div>\n						<div class="col-sm-3">\n							<div class="panel panel-primary" id="touch-swipe-gesture">\n								<div class="panel-heading">Touch Swipe</div>\n								<div class="panel-body">Touch Swipe Gesture</div>\n							</div>\n						</div>\n						<div class="col-sm-3">\n							<div class="panel panel-primary">\n								<div class="panel-heading">Jquery Pep</div>\n								<div class="panel-body"><button id="jquery-pep-gesture" class="btn btn-primary">Jquery Pep Gesture</button></div>\n							</div>\n						</div>\n\n					</div>\n				</div>\n			</div>\n		</div>\n\n	</div>');
}));
Meteor.startup(Template.body.renderToDocument);

}).call(this);
