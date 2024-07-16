import { ChevronRight } from "lucide-react";
import styles from "./style.module.scss";
import SearchContent from "../SearchContent/SearchContent";
import CustomInput from "../ui/CustomInput/CustomInput";

const fileds = ["mark", "model", "generation"];

export default function TabByCar() {
  return (
    <>
      <div className={styles.fields}>
        {fileds.map((item, i) => (
          <CustomInput
            key={i}
            placeholder={"text " + i}
            id={item}
            svg={<ChevronRight />}
          />
        ))}
      </div>
      <SearchContent>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque,
          eligendi ipsa iste optio consequatur qui, magnam sint laudantium
          cumque eius architecto sunt aliquam recusandae. Laudantium nisi dicta,
          delectus nesciunt labore deleniti consequatur similique culpa pariatur
          laboriosam minus et iste beatae dolore reprehenderit? Minima, sapiente
          fuga officia iure porro at animi quasi consequuntur, doloribus quas
          repellendus maxime nulla hic laboriosam earum dolorem quis quod nam
          voluptates iste facilis veritatis nobis. In at possimus illum
          obcaecati sint et? Excepturi voluptate facere repudiandae quae
          blanditiis autem, saepe rem qui ducimus fugit voluptates eos illum ad
          repellat quibusdam iure esse sequi magni culpa odit!
        </div>
      </SearchContent>
    </>
  );
}
