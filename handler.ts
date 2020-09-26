import { APIGatewayProxyHandler } from 'aws-lambda'
import { KitProvider, Monitors } from 'tessellated-geometry-celo-network-monitor'

export const monitor: APIGatewayProxyHandler = async (
  _event,
  _context,
) => {
  const addressFile = process.env.ADDRESS_FILE || ""
  const slackUrl = process.env.SLACK_URL || ""
  const slackChannel = process.env.SLACK_CHANNEL || ""
  const pdKey = process.env.PD_KEY || ""
  const pdService = process.env.PD_SERVICE || ""
  const rpcUrl = process.env.RPC_URL || "http://localhost:8545"
  const blocksToScan = parseInt(process.env.BLOCKS_TO_SCAN || "200")

  const kitProvider = new KitProvider(rpcUrl)

  const celoMonitor = new Monitors.CeloMonitor.default(
    kitProvider,
    addressFile,
    slackUrl,
    slackChannel,
    pdKey,
    pdService,
    blocksToScan,
    true
  )
  await celoMonitor.monitor()

  return {
    statusCode: 200,
    body: 'Monitored.',
  }
}
