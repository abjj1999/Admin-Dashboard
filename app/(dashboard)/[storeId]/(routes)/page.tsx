import prismadb from "@/lib/prismadb";

interface DashboardPageProps {
    params: {storeId: string}
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params: {storeId}
}) => {
    return ( 
        <div>
            <h1>Dashboard</h1>
            <h2>active store: {storeId}</h2>
        </div>
     );
}
 
export default DashboardPage;