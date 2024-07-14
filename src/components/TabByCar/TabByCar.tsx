import { ChevronRight } from "lucide-react";
import styles from "./style.module.scss";

const fileds = ["mark", "model", "generation"];

export default function TabByCar() {
  return (
    <div className={styles.fields}>
      {fileds.map((item, i) => (
        <div className={styles.field} key={i}>
          <input type="text" id={item} placeholder={"text " + i} />
          <ChevronRight className="" />
        </div>
      ))}
      <div className={styles.content}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum quo
        quibusdam alias ab tenetur? Repudiandae officiis odio dolorem tempora.
        Ea nemo dolorum aspernatur voluptates, veniam fugiat voluptatum quasi
        dolore unde asperiores non maxime expedita ratione! Facere, unde?
        Voluptatem ipsam assumenda qui corrupti blanditiis quasi dolore deserunt
        laboriosam amet ipsum, deleniti illum doloremque cum architecto
        laudantium earum! Odio, nostrum eveniet quisquam voluptates quia earum
        eius iure minima. Sit ab ullam maxime qui necessitatibus porro quo
        dolores quos velit quidem molestias a, alias tempora aspernatur, culpa,
        omnis cupiditate voluptatibus quibusdam magnam unde provident voluptas
        id. Deserunt illo quae debitis quidem numquam doloribus distinctio illum
        dignissimos nulla consequatur quisquam magni tempora ipsum, soluta ipsa,
        odit consectetur possimus. Nobis, repellendus non. Corrupti inventore,
        reprehenderit, iure voluptates, dolores consectetur voluptatum natus
        maxime expedita sed officiis. Veniam nobis vitae suscipit reprehenderit
        reiciendis similique accusantium corrupti iusto non, mollitia sequi,
        ipsum sunt eum incidunt fugiat itaque laborum a quos sed harum. Facere
        quia exercitationem eveniet laborum nesciunt, voluptatem quibusdam
        voluptatum corrupti officiis fugiat optio repellendus, explicabo odit
        aperiam corporis deleniti quas iure suscipit omnis nostrum eos. Nesciunt
        autem, fugiat deleniti tempora obcaecati modi possimus suscipit quaerat?
        Quam incidunt ullam voluptatibus voluptatem quaerat praesentium
        perferendis deleniti nihil sequi nostrum quisquam dolorum rerum
        provident sit omnis magni odit, ratione repellat officiis sunt
        consectetur odio aliquam laborum. Ut commodi exercitationem sed iste
        unde nemo ipsum beatae rerum aliquid, sint doloribus doloremque!
        Consequuntur dolores commodi ipsum quos ipsam voluptatum quisquam ad
        voluptatibus molestias earum dolorem, iste praesentium debitis ea
        eligendi? Hic, eius numquam repudiandae architecto molestias debitis
        commodi mollitia necessitatibus minima sunt eligendi repellendus officia
        magnam ab, facere et laboriosam! Esse, atque deserunt eveniet omnis
        dolores qui quae tenetur dolore dignissimos nihil quaerat illo libero a
        facilis, labore consequuntur! Dolor quos, illo saepe natus veritatis,
        distinctio quas magnam suscipit impedit reprehenderit blanditiis rerum.
        Nulla, similique. Deserunt hic velit voluptas ducimus, expedita tenetur
        dolorum doloribus libero soluta laudantium veritatis iste aliquid! Ut,
        id mollitia, illum nulla voluptatibus neque dolores veritatis tenetur
        quidem explicabo exercitationem repellat vitae minima ratione officia
        esse. Perferendis quo laudantium enim tempore ipsam iste libero in
        deleniti optio, magnam eligendi illo ab doloribus, minus deserunt!
        Incidunt laborum similique esse error sapiente sunt, unde explicabo
        repudiandae nobis ullam! Architecto expedita facere qui explicabo!
        Explicabo natus alias, labore consectetur distinctio neque expedita
        dolorem fugiat! Illum, repellendus voluptas. Doloremque et suscipit,
        fuga consequatur aut quo magni, dolore, porro modi nobis minima eaque
        sapiente! Laboriosam, expedita commodi! Modi quod fuga perspiciatis,
        ipsam rem consequuntur architecto nobis quia assumenda magnam, iusto
        impedit laborum labore soluta recusandae tempora voluptatibus sed quis
        dolorum perferendis. Amet perferendis architecto exercitationem. In sed
        accusamus velit enim illum architecto accusantium doloribus repellendus
        vero esse sapiente excepturi facere hic fugiat distinctio, repellat id,
        iure magnam laudantium repudiandae a voluptates ipsam! Libero quaerat,
        harum tempora ea praesentium itaque hic officia veritatis optio. Ducimus
        doloremque illo vitae accusamus nam ipsum id nobis corporis sit ipsam
        sequi amet quo accusantium porro esse ea aperiam ullam expedita atque,
        earum, illum, iste distinctio rerum blanditiis? Ipsum.
      </div>
    </div>
  );
}
