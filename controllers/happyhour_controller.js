"use strict";
exports.__esModule = true;
//const Contact = mongoose.model('Contact', ContactSchema);
var HappyHourController = /** @class */ (function () {
    function HappyHourController() {
    }
    HappyHourController.prototype.HappyHourController = function () {
    };
    HappyHourController.prototype.addNewHappyHour = function (req, res) {
        res.send("new happy hour");
    };
    return HappyHourController;
}());
exports["default"] = HappyHourController;
