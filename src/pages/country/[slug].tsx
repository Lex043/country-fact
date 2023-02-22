import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: Results[];
  slug: string;
}

interface Results {
  name: {
    common: string;
  };
  population: number;
  area: number;
  region: string;
  flags: {
    svg: string;
    alt: string;
  };
  subregion: string;
  capital: string[];
  languages: string[];
}

const Details = ({ data, slug }: Props) => {
  return (
    <>
      <Head>
        <title>Country | {slug}</title>
      </Head>

      <Link href="/">
        <button className="bg-[#243a2f] rounded-md mb-10 text-xl px-4 py-1 ml-10">
          Back
        </button>
      </Link>

      <div>
        {data &&
          data.map((res, id) => (
            <div className="font-mono flex flex-col items-center my-6" key={id}>
              <Image
                src={res.flags.svg}
                alt={res.flags.alt ? res.flags.alt : "flags"}
                width={200}
                height={200}
              />
              <p className="pt-5 font-bold">{res.name.common.toUpperCase()}</p>
              <p>Capital: {res.capital}</p>
              <p>Region: {res.region}</p>
              <p>Subregion: {res.subregion}</p>
              {res.languages &&
                Object.values(res.languages).map((value, id) => (
                  <p key={id}>Language: {value}</p>
                ))}
            </div>
          ))}
      </div>
    </>
  );
};

export default Details;

export const getStaticPaths = async () => {
  const res = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await res.json();
  const paths = data.map((res: any) => ({
    params: { slug: res.name.common },
  }));
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps(context: any) {
  const slug = context.params.slug;
  const res = await fetch("https://restcountries.com/v3.1/name/" + slug);
  const data = await res.json();
  return {
    props: {
      data,
      slug,
    },
  };
}
