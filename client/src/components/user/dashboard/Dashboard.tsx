import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { connect, ConnectedProps } from 'react-redux'

import { RootState } from 'store/store'
import { useDashboard } from 'hooks/usedashboard'

import UserInfo from './UserInfo'
import Spinner from 'components/common/Spinner'
import QuizList from './QuizList'
import ResultList from './ResultList'

const mapState = (state: RootState) => ({
  user: state.user
})

const connector = connect(mapState)

type Props = ConnectedProps<typeof connector>

const colSize = {
  sm: 10,
  md: 8,
  lg: 7,
  xl: 6
}

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = ({ user }: Props) => {
  const data = useDashboard(user.user)
  return user.loading ? (
    <Spinner />
  ) : (
    <div className="content">
      <Container fluid className="dashboard">
        <Row className="pt-1 mt-1">
          <Col {...colSize} className="dashboard__block mx-auto">
            <UserInfo />
          </Col>
        </Row>
        <Row className="pt-1 mt-1">
          <Col {...colSize} className="dashboard__block mx-auto">
            <QuizList
              loading={data.quizzes.loading}
              quizzes={data.quizzes.data ?? []}
            />
          </Col>
        </Row>
        <Row className="pt-1 mt-1">
          <Col {...colSize} className="dashboard__block mx-auto">
            <ResultList
              loading={data.results.loading}
              results={data.results.data ?? []}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default connector(Dashboard)
