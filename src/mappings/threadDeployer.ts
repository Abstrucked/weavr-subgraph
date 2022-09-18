import { Address, dataSource, log, BigInt, store, DataSourceContext } from '@graphprotocol/graph-ts';
import { 
  CrowdfundedThread,
  Thread as ThreadEvent,
} from '../../generated/ThreadDeployer/ThreadDeployer';
import { 
  Thread as ThreadContract
} from '../../generated/templates/Thread/Thread';
import { Thread as ThreadTemplate } from '../../generated/templates';
import {
  Crowdfund as CrowdfundContract
} from '../../generated/templates/Crowdfund/Crowdfund';
import {Crowdfund as CrowdfundTemplate} from '../../generated/templates';
import { Crowdfund, Thread } from '../../generated/schema';
import { getFrabricERC20 } from './helpers/erc20';

// ### THREAD FACTORY ###

export function handleThread(event: ThreadEvent): void {
  let id = event.params.thread.toHexString()

  let threadContext = new DataSourceContext()
  threadContext.setString('id', id)
  ThreadTemplate.createWithContext(event.params.thread, threadContext)

  let threadContract = ThreadContract.bind(event.params.thread)

  let thread = new Thread(id)
  thread.contract = event.params.thread
  thread.variant = event.params.variant
  thread.frabric = threadContract.frabric().toHexString()
  thread.governor = event.params.governor
  thread.erc20 = getFrabricERC20(event.params.erc20).id
  thread.descriptor = event.params.descriptor
  thread.save()
}

export function handleCrowdfundedThread(event: CrowdfundedThread): void {
  let threadID = event.params.thread
  let crowdfundID = event.params.crowdfund.toHexString()
  
  // let crowdfundContext = new DataSourceContext()
  // crowdfundContext.setString('id', crowdfundID)
  // CrowdfundTemplate.createWithContext(event.params.crowdfund, crowdfundContext)

  // let crowdfundContract = CrowdfundContract.bind(event.params.crowdfund)

  let crowdfund = new Crowdfund(crowdfundID)
  crowdfund.thread = event.params.thread.toHexString()
  crowdfund.erc20 = event.params.token.toHexString()
  

}