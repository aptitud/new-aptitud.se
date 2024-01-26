## Getting Started

copy `template.env` and name it `.env.local`
set the value for `CONTENTFUL_ACCESS_TOKEN`
and `INSTAGRAM_ACCESS_TOKEN`, fetch it from vercel

Copy `CONTENTFUL_ACCESS_TOKEN` from <https://vercel.com/aptitud/new-aptitud-se/settings/environment-variables>
Generate a `CONTENTFUL_MANAGEMENT_API_TOKEN` from : <https://app.contentful.com/spaces/kqhdnxbobtly/api/cma_tokens>

Then run the development server:

```bash
npm install
npm run build
npm run dev
# or
yarn dev
```

### Hosting

Hosted on Vercel

`main` = [aptitud.se](https://aptitud.se)

`develop` = [beta.aptitud.se](https://beta.aptitud.se)
