## laf-cli

### Install

```bash
npm i laf-cli -g
```

## Examples 

####  use laf-cli to sync website files to a OSS bucket

##### 1. write `.env` file in your project root directory to set the following variables:
```env
OSS_ENDPOINT=https://oss.lafyun.com
OSS_ACCESS_KEY=xxxxx
OSS_ACCESS_SECRET=xxxxxx
OSS_BUCKET_NAME=xxxxxx
OSS_REGION=cn-default
```

##### 2. run `laf-cli sync ./dist` command to sync files to OSS bucket
