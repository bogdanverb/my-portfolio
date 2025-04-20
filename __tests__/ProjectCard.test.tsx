import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProjectCard from '../components/ProjectCard'

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    const { getByText } = render(
      <ProjectCard
        title="Test Project"
        description="Test description"
        slug="test-project"
        cover="/test.jpg"
      />
    )
    expect(getByText('Test Project')).toBeInTheDocument()
    expect(getByText('Test description')).toBeInTheDocument()
  })
})
