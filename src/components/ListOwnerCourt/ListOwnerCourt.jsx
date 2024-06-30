import { useEffect, useState } from "react";
import { getOwnerYards } from "../../services/yardAPI";
import { Card, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function ListOwnerCourt() {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const hostId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getOwnerYards(hostId);
        if (data) {
          setCourts(data);
        }
      } catch (error) {
        console.error("Failed to fetch courts:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchCourts();
  }, [hostId]);

  return (
    <div className="container mx-auto flex justify-evenly">
      {loading ? (
        <Spin size="large" />
      ) : (
        courts.map((court) => (
          <Card
            key={court.id}
            hoverable
            style={{ width: 340 }}
            cover={<img alt="example" src="/src/assets/1.png" />}
            actions={[
              <a onClick={() => navigate(`/courts/${court.id}`)}>Chỉnh sửa</a>,
            ]}
          >
            <Meta title={court.name} description={court.description} />
          </Card>
        ))
      )}
    </div>
  );
}
