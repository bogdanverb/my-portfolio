import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Project } from '../../types';
import { getProjectBySlug, getAllProjects } from '../../utils/cms';
import Layout from '../../components/Layout';

interface ProjectPageProps {
  project: Project;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ project }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <img src={project.image} alt={project.title} className="my-4" />
        <div className="prose">
          <p>{project.description}</p>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getAllProjects();
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const project = await getProjectBySlug(params?.slug as string);

  return {
    props: {
      project,
    },
    revalidate: 10,
  };
};

export default ProjectPage;