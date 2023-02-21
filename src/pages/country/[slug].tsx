import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: Results[];
  slug: string;
}

interface Results {
  name: string | any;
  population: number;
  area: number;
  region: string;
  flags: {
    svg: string;
    alt: string;
  };
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
        <h1 className="text-center mb-10 text-3xl">Home</h1>
      </Link>

      <div>
        {data &&
          data.map((res, id) => (
            <div className="font-mono flex flex-col items-center" key={id}>
              <Image
                src={res.flags.svg}
                alt={res.flags.alt ? res.flags.alt : "flags"}
                width={200}
                height={200}
              />
              <p className="pt-5 font-bold">{res.name.common}</p>
              <p>Capital: {res.capital[0]}</p>
              <p>Region: {res.region}</p>
              {Object.values(res.languages).map((value, id) => (
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
