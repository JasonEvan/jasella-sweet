import { IWishes } from "@/lib/dto";
import { useEffect, useState } from "react";

export default function PreviewTable() {
  const [currPageData, setCurrPageData] = useState<IWishes[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const [jumlahHalaman, setJumlahHalaman] = useState<number>(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/wish/total`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setTotalData(res.data))
      .catch((err) => console.info(err));

    setJumlahHalaman(Math.ceil(totalData / 5));
  }, [totalData]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BE_URL}/api/wish/paginate?p=${currPage}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setCurrPageData(res.data))
      .catch((err) => console.info(err));
  }, [currPage]);

  return (
    <div className="mb-44">
      <div className="flex justify-center mb-5" data-aos="fade-up">
        <span className="font-secondary font-normal text-3xl text-white">
          Your Wishes Here!
        </span>
      </div>
      <div className="overflow-x-auto text-white" data-aos="fade-up">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th></th>
              <th>Name</th>
              <th>Wish</th>
            </tr>
          </thead>
          <tbody>
            {currPageData.map((el, idx) => (
              <tr className="hover" key={idx}>
                <th>{idx + 1 + 5 * (currPage - 1)}</th>
                <td>{el.name}</td>
                <td>{el.wish}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center" data-aos="fade-up">
        <div className="join mt-5">
          {currPage > 1 && (
            <button
              className="join-item btn"
              onClick={() => setCurrPage(currPage - 1)}
            >
              «
            </button>
          )}
          <button className="join-item btn">Page {currPage}</button>
          {currPage != jumlahHalaman && jumlahHalaman != 0 && (
            <button
              className="join-item btn"
              onClick={() => setCurrPage(currPage + 1)}
            >
              »
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
