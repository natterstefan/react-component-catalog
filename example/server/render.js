/**
 * For now we just allow the server to serve clients defined in `allowedClients`
 * in a more sophisticated setup, one would derive the `client` value from other
 * parameters (eg. hostname, path, ...).
 * 
 * For this demo this restriction and identification of the client is enough.
 */
const allowedClients = ['base', 'client1']

export default async req => {
  let client = req.url.pathname.slice(1) || 'base'
  if (!allowedClients.includes(client)) {
    client = 'base'
  }

  return `
    <!DOCTYPE html>
    <html lang="de-at">
      <head>
        <title>${client}'s page</title>
        <meta charset="utf-8">
      </head>
      <body>
        <div id="_root"></div>
        <script src="static/vendor.bundled.js" defer></script>
        <script src="static/${client}.bundled.js" defer></script>
      </body>
    </html>`
}
