/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react'
import devcert from 'devcert'
import { UserConfigExport } from 'vite'

export default async (): Promise<UserConfigExport> => {
  const { key, cert } = await devcert.certificateFor('localhost')

  return {
    plugins: [react()],
    server: {
      https: {
        key,
        cert,
      },
    },
  }
}
