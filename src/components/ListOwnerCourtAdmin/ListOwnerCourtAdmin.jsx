import { useEffect, useState } from "react";
import { getOwnerYards } from "../../services/yardAPI";
import { Card, Carousel, Skeleton, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Meta } = Card;

export default function ListOwnerCourtAdmin() {
  const navigate = useNavigate();
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { hostid } = useParams();

  useEffect(() => {
    const fetchCourts = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getOwnerYards(hostid);
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
  }, [hostid]);

  return (
    <div className="container mx-auto flex justify-evenly">
      {loading ? (
        <>
          <div className="flex-col justify-center items-center">
            <Skeleton active paragraph={{ rows: 10, width: 1000 }} />
          </div>
        </>
      ) : (
        courts.map((court) => (
          <Card
            key={court.id}
            hoverable
            style={{ width: 340 }}
            cover={
              court.images.length > 0 ? (
                <Carousel autoplay>
                  {court.images.map((image, index) => (
                    <img
                      alt={`court-${index}`}
                      src={image.image}
                      className="w-full h-52"
                    />
                  ))}
                </Carousel>
              ) : (
                <img
                  alt="court"
                  src="/src/assets/1.png"
                  className="w-full h-52"
                />
              )
            }
            actions={[
              <a key="edit" onClick={() => navigate(`/courts/${court.id}`)}>
                Chỉnh sửa
              </a>,
              <a key="payment" onClick={() => navigate(`/payment/${court.id}`)}>
                Xem thanh toán
              </a>,
              <a
                key="payment"
                onClick={() => navigate(`/feedback/${court.id}`)}
              >
                Xem đánh giá
              </a>,
            ]}
          >
            <Meta
              title={court.name}
              description={court.description}
              style={{ height: "100px" }}
            />
          </Card>
        ))
      )}
    </div>
  );
}
