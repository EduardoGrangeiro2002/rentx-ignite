"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EtherealMailProvider {
  constructor() {
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    }).catch(err => console.log(err));
  }

  async sendMail(to, subject, variables, templatePath) {
    const templateFileContent = _fs.default.readFileSync(templatePath).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHTML = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: "@Rentx noreplay@rentx.com.br",
      subject,
      html: templateHTML
    });
    console.log("Message sent: %s", message.messageId); // Preview only available when sending through an Ethereal account

    console.log("Preview URL: %s", _nodemailer.default.getTestMessageUrl(message));
  }

}

exports.EtherealMailProvider = EtherealMailProvider;