/* eslint-disable @typescript-eslint/no-explicit-any */
import aws from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.client = nodemailer.createTransport({
      SES: {
        ses: new aws.SES({
          apiVersion: "2010-12-01",
          region: `${process.env.MAIL_REGION}`,
        }),
        aws,
      },
    });
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);
    await this.client.sendMail({
      from: `${process.env.AWS_MAIL_SES}`,
      to,
      subject,
      html: templateHTML,
    });
  }
}
export { SESMailProvider };
