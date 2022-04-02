"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvider = void 0;

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-explicit-any */
class SESMailProvider {
  constructor() {
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: {
        ses: new _awsSdk.default.SES({
          apiVersion: "2010-12-01",
          region: `${process.env.MAIL_REGION}`
        }),
        aws: _awsSdk.default
      }
    });
  }

  async sendMail(to, subject, variables, templatePath) {
    const templateFileContent = _fs.default.readFileSync(templatePath).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      from: `${process.env.AWS_MAIL_SES}`,
      to,
      subject,
      html: templateHTML
    });
  }

}

exports.SESMailProvider = SESMailProvider;