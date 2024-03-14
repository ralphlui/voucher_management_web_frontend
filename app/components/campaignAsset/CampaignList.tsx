import React from 'react'
import { CampaignListParamsProps, CampaignProps } from '@/type/campaign'
import Campaign from './Campaign'

const CampaignList = ({ campaigns, currentSessionUser }: CampaignListParamsProps) => {
    const role = currentSessionUser.role;
    return (
        <section data-testid='campaign-list-by-merchant'>
            <div className='home__campaigns-wrapper'>
                {campaigns.map((campaign: CampaignProps) => (
                    <Campaign campaign={campaign} userRole={role} key={campaign.campaignId} />
                ))}
            </div>
        </section>
    )
}

export default CampaignList