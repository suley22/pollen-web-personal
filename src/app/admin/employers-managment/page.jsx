import { applicationMocks } from "./(mocks)/application-mocks";
import { Content } from "./(components)/content";

export default function AdminEmployersManagmentPage() {
  const employers = applicationMocks;

  return <Content employerList={employers} />;
}
