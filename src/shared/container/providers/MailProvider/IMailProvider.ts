/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMailProvider {
  sendMail(
    to: string,
    subject: string,
    variables: any,
    templatePath: string
  ): Promise<void>;
}
