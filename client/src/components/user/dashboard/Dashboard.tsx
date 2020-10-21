import React from 'react'

import { connect, ConnectedProps } from 'react-redux'

import UserInfo from './UserInfo'
import Spinner from 'components/common/Spinner'
import QuizList from './QuizList'
import ResultList from './ResultList'

import { RootState } from 'store/store'
import { useDashboard } from 'hooks/usedashboard'

const mapState = (state: RootState) => ({
  user: state.user
})

const connector = connect(mapState)

type Props = ConnectedProps<typeof connector>

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({ user }: Props) => {
  const data = useDashboard(user.user)

  return user.loading ? (
    <Spinner />
  ) : (
    <div className="content">
      <div className="dashboard container-fluid">
        <div className="row pt-1 mt-1">
          <section className="dashboard__block col-sm-8 mx-auto">
            <UserInfo />
          </section>
        </div>
        <div className="row pt-1 mt-1">
          <section className="dashboard__block col-sm-8 mx-auto">
            <QuizList
              loading={data.quizzes.loading}
              quizzes={data.quizzes.data ?? []}
            />
          </section>
        </div>
        <div className="row pt-1 mt-1">
          <section className="dashboard__block col-sm-8 mx-auto">
            <ResultList
              loading={data.results.loading}
              results={data.results.data ?? []}
            />
          </section>
        </div>
      </div>
    </div>
  )
}

export default connector(Dashboard)
