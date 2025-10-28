import './details.css'
import { UseQueryResult } from '@tanstack/react-query'
import { Episode, Location } from '../../types'

type ActiveTabContentProps = {
  activeTab: string
  episodeResults: UseQueryResult<Episode>[]
  locationResults: UseQueryResult<Location>[]
}
function ActiveTabContent({
  activeTab,
  episodeResults,
  locationResults,
}: ActiveTabContentProps) {
  if (activeTab === 'locations') {
    return (
      <main className="profile-content">
        <div className="activity-feed">
          {locationResults.some((result) => result.isPending) ? (
            <span>Loading...</span>
          ) : (
            locationResults
              .filter((result) => result.isSuccess)
              .map((result) => result.data)
              .map((locationData: Location, index) => {
                return (
                  <p key={locationData.id}>
                    <b>{`${index === 0 ? 'Origin - ' : 'Actual - '}`}</b>
                    {`${locationData.name} located in ${locationData.dimension}`}
                  </p>
                )
              })
          )}
        </div>
      </main>
    )
  }
  if (activeTab === 'episodes') {
    return (
      <main className="profile-content">
        <div className="activity-feed">
          {episodeResults.some((result) => result.isPending) ? (
            <span>Loading...</span>
          ) : (
            episodeResults
              .filter((result) => result.isSuccess)
              .map((result) => result.data)
              .map((episodeData: Episode) => {
                return (
                  <p key={episodeData.id}>
                    — {episodeData.name} <i>aired</i> {episodeData.air_date}.
                  </p>
                )
              })
          )}
        </div>
      </main>
    )
  }
  return null
}

export default ActiveTabContent
