#!/usr/bin/env node

import { program } from 'commander'
import * as dotenv from 'dotenv'
import { resolve } from 'node:path'
import { handleSyncCommand } from './sync'


// laf-cli sync 
program
  .command('sync <source>')
  .description('sync files to bucket')
  .option('-e, --endpoint <endpoint>', 'endpoint')
  .option('-k, --access-key <access-key>', 'access-key')
  .option('-s, --access-secret <access-secret>', 'access-secret')
  .option('-b, --bucket-name <bucket-name>', 'bucket-name')
  .option('-r, --region <region>', 'region, defaults to us-east-1')
  .option('-d, --dry-run', 'dry-run mode')
  .option('-f, --force', 'force to updated all files ignore if modified, defaults to false')
  .option('--env <env-file>', `your can specify a env file, defaults to .env`)
  .action(async (source, options) => {
    const envFile = options.env || '.env'
    dotenv.config({ path: resolve(process.cwd(), envFile) })

    const endpoint = options.endpoint || process.env.OSS_ENDPOINT
    const accessKey = options.accessKey || process.env.OSS_ACCESS_KEY
    const accessSecret = options.accessSecret || process.env.OSS_ACCESS_SECRET
    const bucketName = options.bucketName || process.env.OSS_BUCKET_NAME
    const region = options.region || process.env.OSS_REGION || 'us-east-1'
    const dryRun = options.dryRun || false
    const force = options.force || false

    if(!endpoint) {
      console.error('endpoint is required')
      process.exit(1)
    }

    if(!accessKey) {
      console.error('accessKey is required')
      process.exit(1)
    }

    if(!accessSecret) {
      console.error('accessSecret is required')
      process.exit(1)
    }

    if(!bucketName) {
      console.error('bucketName is required')
      process.exit(1)
    }

    await handleSyncCommand(source, { endpoint, accessKey, accessSecret, bucketName, dryRun, force, region })
  })


program.parse(process.argv)

