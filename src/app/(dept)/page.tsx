import Image from "next/image";
import { Suspense } from "react";
import DeptNews from "@/components/dept/DeptNews";

export default function Home() {
  return (
    <div id="wrap">
      <div className="pix_diapo">
        <div>
          <Image src="/images/mainimg06.jpg" alt="徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野" width={960} height={354} priority />
        </div>
        <div>
          <Image src="/images/mainimg04.jpg" alt="徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野" width={960} height={354} />
        </div>
        <div>
          <Image src="/images/mainimg05.jpg" alt="徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野" width={960} height={354} />
        </div>
        <div>
          <Image src="/images/mainimg02.jpg" alt="徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野" width={960} height={354} />
        </div>
        <div>
          <Image src="/images/mainimg03.jpg" alt="徳島大学大学院医歯薬学研究部　口腔科学部門　臨床歯学系　顎機能咬合再建学分野" width={960} height={354} />
        </div>
      </div>

      <div id="main">
        <div className="greeting">
          <Image src="/images/gree_title.jpg" width={960} height={40} alt="挨拶" />
          <div className="gre_cont">
            <div className="photoL">
              <Image src="/images/matuka.jpg" width={150} height={150} alt="教授" />
            </div>
            <div className="gre_contR">
              <p>
                顎機能咬合再建学分野は歯科補綴（ほてつ）学の一分野であり、補綴とは歯が大きく欠けたり、なくなった場合にかぶせものや入れ歯などで補うことであります。歯を失うと食物が食べにくかったり、発音しにくかったりと、日常生活に支障をきたします。言及するまでもありませんが、食べることは人間生活の基本であり、良く食べることは非常に大切です。そのため、我々の分野では失った歯をどのように修復するのか、顎がどのように動くのか、夜間の歯ぎしり運動はどのようになされているのか、金属アレルギーはどのような状態であるのか、顎関節症や口腔顔面痛はどのように診断・治療するのかなどに関して研究を進めるとともに、治療に結びつくように努力しています。これらの研究や臨床は良く噛むことにつながり、人類の幸福に寄与することができるものと期待しております。その他にも徳島大学病院の他の科や専門外来と連携しながら最新の治療を提供したいと考えております。インフォームドコンセントに基づく患者さん中心の医療・質の高い補綴治療をスタッフ一同で提供して行くつもりです。
              </p>
              <p>
                <strong>顎機能咬合再建学分野教授　松香 芳三</strong>
              </p>
            </div>
            <div className="crr"></div>
          </div>
        </div>

        <div id="contents_l">
          <div id="new">
            <Image src="/images/news.jpg" width={600} height={30} alt="新着情報" />
            <Suspense fallback={<p style={{ padding: "10px" }}>読み込み中...</p>}>
              <DeptNews />
            </Suspense>
          </div>
        </div>

        <div id="contents_r">
          <div id="link">
            <Image src="/images/link.jpg" alt="リンク" width={300} height={30} />
            <ul className="link_but">
              <li className="marT10">
                <a href="http://www.tokushima-hosp.jp/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/link01.jpg" alt="徳島大学病院" className="hoverImg" width={300} height={50} />
                </a>
              </li>
              <li className="marT10">
                <a href="/allergy/ja" rel="noopener noreferrer">
                  <Image src="/images/link03.jpg" alt="徳島大学病院 歯科用金属アレルギー外来" className="hoverImg" width={300} height={50} />
                </a>
              </li>
              <li>
                <a href="http://www.tokushima-u.ac.jp/dent/" target="_blank" rel="noopener noreferrer">
                  <Image src="/images/link02.jpg" alt="徳島大学歯学部・大学院" className="hoverImg" width={300} height={50} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="crr"></div>
      </div>
    </div>
  );
}
