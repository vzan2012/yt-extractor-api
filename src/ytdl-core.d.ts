declare module 'ytdl-core' {
  function ytdl(url: string, options?: any): any;
  function chooseFormat(formats: any, options?: any): any;

  export = ytdl;
}
