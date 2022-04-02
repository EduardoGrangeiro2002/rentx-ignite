"use strict";

var _tsyringe = require("tsyringe");

var _DayjsDateProvider = require("../DateProvider/implementations/DayjsDateProvider");

_tsyringe.container.registerSingleton("DayjsDateProvider", _DayjsDateProvider.DayjsDateProvider);