"use client"

import { FileText, AlertCircle } from "lucide-react"
import {
  LegalShell,
  LegalSection,
  LegalText,
  LegalSubtitle,
  LegalList,
  LegalListItem,
  LegalCallout,
  LegalStrong,
  LegalLink,
  type TOCItem,
  type RelatedPolicy,
} from "@/components/legal/LegalShell"

const toc: TOCItem[] = [
  { id: "aceitacao", label: "Aceitação" },
  { id: "servico", label: "O que é o serviço" },
  { id: "cadastro", label: "Cadastro e conta" },
  { id: "trial", label: "Teste grátis" },
  { id: "planos", label: "Planos e pagamento" },
  { id: "cancelamento", label: "Cancelamento e reembolso" },
  { id: "obrigacoes", label: "Suas obrigações" },
  { id: "uso-proibido", label: "Uso proibido" },
  { id: "propriedade", label: "Propriedade intelectual" },
  { id: "dados", label: "Dados e privacidade" },
  { id: "disponibilidade", label: "Disponibilidade" },
  { id: "limitacao", label: "Limitação de responsabilidade" },
  { id: "rescisao", label: "Rescisão" },
  { id: "alteracoes", label: "Alterações nos termos" },
  { id: "foro", label: "Lei e foro" },
  { id: "contato", label: "Contato" },
]

const related: RelatedPolicy[] = [
  {
    href: "/privacidade",
    label: "Política de Privacidade",
    description:
      "O que a gente coleta, como usa e como você mantém o controle.",
  },
  {
    href: "/lgpd",
    label: "Central de Privacidade",
    description:
      "Exerça seus direitos como titular de dados em poucos cliques.",
  },
]

export default function TermosPage() {
  return (
    <LegalShell
      eyebrow="Termos de Uso"
      title="Termos de Uso da Plataforma"
      subtitle="As regras combinadas entre você e a Bellory. Escritas em português claro — sem pegadinhas, sem letra miúda."
      lastUpdated="22 de abril de 2026"
      toc={toc}
      relatedPolicies={related}
    >
      <LegalCallout icon={FileText} title="O que você precisa saber" tone="accent">
        <LegalList>
          <LegalListItem>
            Usar o Bellory é opcional e pode ser cancelado quando quiser, em 1
            clique, sem multa.
          </LegalListItem>
          <LegalListItem>
            O teste grátis de 14 dias não exige cartão de crédito e não vira
            cobrança automática.
          </LegalListItem>
          <LegalListItem>
            Os dados que você cadastra (seus e dos seus clientes) são seus —
            pode exportar e levar embora a qualquer momento.
          </LegalListItem>
        </LegalList>
      </LegalCallout>

      <LegalSection id="aceitacao" number="01" title="Aceitação destes termos">
        <LegalText>
          Ao criar uma conta no Bellory, contratar um plano ou usar qualquer
          funcionalidade da plataforma, você declara que <LegalStrong>leu, entendeu
          e concorda</LegalStrong> com estes Termos de Uso e com a nossa{" "}
          <LegalLink href="/privacidade">Política de Privacidade</LegalLink>.
        </LegalText>
        <LegalText>
          Se você está aceitando em nome de uma empresa (CNPJ), confirma que
          tem poderes legais para isso.
        </LegalText>
      </LegalSection>

      <LegalSection id="servico" number="02" title="O que é o Bellory">
        <LegalText>
          <LegalStrong>Bellory</LegalStrong> é uma plataforma SaaS (software
          como serviço) de gestão para salões de beleza, barbearias, clínicas
          de estética, nail designers, spas e negócios similares do segmento
          de beleza e bem-estar no Brasil. Inclui, entre outras
          funcionalidades, agenda online, CRM, controle financeiro, agente de
          IA no WhatsApp, site personalizado e presença digital.
        </LegalText>
        <LegalText>
          O serviço é prestado pela internet, sem instalação local, acessível
          pelo navegador e pelos aplicativos mobile oficiais (Android e iOS).
        </LegalText>
      </LegalSection>

      <LegalSection id="cadastro" number="03" title="Cadastro e conta">
        <LegalText>
          Para usar o Bellory, você precisa criar uma conta informando dados
          verdadeiros, completos e atualizados. É sua responsabilidade manter
          essas informações corretas e preservar o sigilo da senha.
        </LegalText>
        <LegalList>
          <LegalListItem>
            Cada conta é pessoal e intransferível. Um mesmo estabelecimento
            pode ter múltiplos usuários com permissões diferentes (equipe).
          </LegalListItem>
          <LegalListItem>
            Você é responsável por toda atividade que acontece dentro da sua
            conta, inclusive por logins de terceiros autorizados por você.
          </LegalListItem>
          <LegalListItem>
            Em caso de acesso não autorizado, avise a gente imediatamente em{" "}
            <LegalLink href="mailto:suporte@bellory.com.br" external>
              suporte@bellory.com.br
            </LegalLink>
            .
          </LegalListItem>
          <LegalListItem>
            É necessário ter pelo menos 18 anos para contratar.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="trial" number="04" title="Teste grátis de 14 dias">
        <LegalText>
          Todo novo usuário tem direito a um período de teste gratuito de{" "}
          <LegalStrong>14 dias corridos</LegalStrong> a partir da criação da
          conta, com acesso a todas as funcionalidades de um plano pago
          equivalente.
        </LegalText>
        <LegalList>
          <LegalListItem>
            Não é necessário informar cartão de crédito para começar.
          </LegalListItem>
          <LegalListItem>
            Ao final dos 14 dias, sua conta cai automaticamente para o plano
            Gratuito (se disponível) — nunca há cobrança surpresa.
          </LegalListItem>
          <LegalListItem>
            Para continuar usando recursos de planos pagos, basta contratar um
            plano dentro do período de teste ou depois dele.
          </LegalListItem>
          <LegalListItem>
            O teste grátis é concedido uma vez por CPF/CNPJ.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="planos" number="05" title="Planos, cobrança e pagamento">
        <LegalSubtitle>Valores e periodicidade</LegalSubtitle>
        <LegalText>
          Os valores de cada plano estão descritos na página{" "}
          <LegalLink href="/#planos">Planos</LegalLink> e podem ser cobrados{" "}
          <LegalStrong>mensalmente</LegalStrong> ou{" "}
          <LegalStrong>anualmente</LegalStrong>, conforme sua escolha na
          contratação. Valores expressos em Reais (R$) e já incluem os
          tributos aplicáveis.
        </LegalText>

        <LegalSubtitle>Formas de pagamento</LegalSubtitle>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Pix:</LegalStrong> confirmação instantânea.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Cartão de crédito:</LegalStrong> débito recorrente
            automático, podendo ser alterado a qualquer momento no painel.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Boleto bancário:</LegalStrong> para contratos anuais.
          </LegalListItem>
        </LegalList>

        <LegalSubtitle>Reajustes</LegalSubtitle>
        <LegalText>
          Reajustes de preço podem ocorrer no máximo uma vez por ano,
          comunicados por e-mail com pelo menos 30 dias de antecedência. Você
          pode cancelar sem custo se não concordar.
        </LegalText>

        <LegalSubtitle>Inadimplência</LegalSubtitle>
        <LegalText>
          Caso o pagamento não seja identificado no vencimento, o acesso aos
          recursos pagos é suspenso após <LegalStrong>7 dias corridos</LegalStrong>.
          Seus dados continuam preservados por até 60 dias, aguardando a
          regularização.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="cancelamento"
        number="06"
        title="Cancelamento e reembolso"
      >
        <LegalText>
          Você pode cancelar a sua assinatura a qualquer momento, diretamente
          no painel em <em>Configurações → Plano</em>, sem multa nem
          justificativa.
        </LegalText>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Plano mensal:</LegalStrong> cancelamento vale para o
            próximo ciclo. Os dias já pagos do mês corrente permanecem ativos.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Plano anual:</LegalStrong> é possível solicitar o
            reembolso proporcional dos meses não utilizados, mediante dedução
            de eventual desconto anual aplicado.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Direito de arrependimento:</LegalStrong> o Código de
            Defesa do Consumidor garante 7 dias para desistência a partir da
            contratação, com devolução integral.
          </LegalListItem>
          <LegalListItem>
            Ao cancelar, você pode baixar todos os seus dados em formato
            Excel e JSON pela opção <em>Exportar dados</em>.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="obrigacoes" number="07" title="Suas obrigações">
        <LegalList>
          <LegalListItem>
            Fornecer informações verdadeiras e manter a conta atualizada.
          </LegalListItem>
          <LegalListItem>
            Obter e manter o consentimento adequado dos seus clientes quanto
            ao tratamento de dados que você cadastra no sistema (conforme
            LGPD), já que para esses dados você é a controladora.
          </LegalListItem>
          <LegalListItem>
            Usar o Bellory apenas para finalidades legítimas e relacionadas ao
            seu negócio.
          </LegalListItem>
          <LegalListItem>
            Respeitar os limites de uso do plano contratado.
          </LegalListItem>
          <LegalListItem>
            Manter sua senha protegida e avisar em caso de uso indevido.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="uso-proibido" number="08" title="O que não é permitido">
        <LegalText>
          É vedado usar o Bellory para:
        </LegalText>
        <LegalList>
          <LegalListItem>
            Qualquer atividade ilícita, fraudulenta ou que viole direitos de
            terceiros.
          </LegalListItem>
          <LegalListItem>
            Enviar spam, mensagens não solicitadas em massa ou conteúdo que
            descumpra a LGPD, o Marco Civil da Internet ou o Código de Defesa
            do Consumidor.
          </LegalListItem>
          <LegalListItem>
            Fazer engenharia reversa, descompilar ou tentar burlar os
            mecanismos de segurança da plataforma.
          </LegalListItem>
          <LegalListItem>
            Revender ou sublicenciar o acesso a terceiros sem autorização
            escrita.
          </LegalListItem>
          <LegalListItem>
            Carregar conteúdo que contenha vírus, malware ou código malicioso.
          </LegalListItem>
        </LegalList>
        <LegalText>
          O descumprimento pode levar à suspensão imediata da conta, sem
          prejuízo das medidas legais cabíveis.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="propriedade"
        number="09"
        title="Propriedade intelectual"
      >
        <LegalText>
          Toda a plataforma — código, design, marca, documentação, templates
          de site — é de propriedade exclusiva da Bellory e protegida pela
          legislação brasileira de direitos autorais e propriedade
          industrial.
        </LegalText>
        <LegalText>
          O acesso por assinatura concede a você uma{" "}
          <LegalStrong>licença limitada, não exclusiva e intransferível</LegalStrong>{" "}
          de uso, enquanto durar a contratação.
        </LegalText>
        <LegalText>
          Os conteúdos que você cadastra (fotos, textos, preços, dados de
          clientes) <LegalStrong>continuam sendo seus</LegalStrong> — a gente
          só hospeda e processa para prestar o serviço.
        </LegalText>
      </LegalSection>

      <LegalSection id="dados" number="10" title="Dados e privacidade">
        <LegalText>
          O tratamento de dados pessoais está detalhado na nossa{" "}
          <LegalLink href="/privacidade">Política de Privacidade</LegalLink>.
          Leia para entender o que coletamos, por que, com quem compartilhamos
          e como você exerce seus direitos como titular.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="disponibilidade"
        number="11"
        title="Disponibilidade do serviço"
      >
        <LegalText>
          A gente mantém um compromisso de{" "}
          <LegalStrong>uptime de 99,9%</LegalStrong> calculado mensalmente,
          excluindo janelas de manutenção programada (sempre avisadas com pelo
          menos 48h de antecedência).
        </LegalText>
        <LegalText>
          Em caso de indisponibilidade não programada acima de 8 horas em um
          mês, você tem direito a crédito proporcional no próximo ciclo
          mediante solicitação.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="limitacao"
        number="12"
        title="Limitação de responsabilidade"
      >
        <LegalText>
          A Bellory não se responsabiliza por:
        </LegalText>
        <LegalList>
          <LegalListItem>
            Prejuízos decorrentes de uso indevido da plataforma por você ou
            terceiros autorizados.
          </LegalListItem>
          <LegalListItem>
            Falhas de terceiros fora do nosso controle (WhatsApp, gateways de
            pagamento, operadoras de internet, fornecedores de nuvem) —
            embora a gente faça o possível para mitigar.
          </LegalListItem>
          <LegalListItem>
            Lucros cessantes ou danos indiretos decorrentes de
            indisponibilidade temporária, limitados, em qualquer hipótese, ao
            valor pago pelo contratante nos últimos 12 meses.
          </LegalListItem>
        </LegalList>
        <LegalText>
          Nada neste item afasta direitos garantidos pelo Código de Defesa do
          Consumidor.
        </LegalText>
      </LegalSection>

      <LegalSection id="rescisao" number="13" title="Rescisão por parte da Bellory">
        <LegalText>
          A gente se reserva o direito de suspender ou encerrar contas que:
        </LegalText>
        <LegalList>
          <LegalListItem>
            Descumpram estes Termos de Uso ou a Política de Privacidade.
          </LegalListItem>
          <LegalListItem>
            Estejam envolvidas em fraude, atividade ilícita ou abuso.
          </LegalListItem>
          <LegalListItem>
            Tenham pagamentos em atraso por mais de 60 dias sem comunicação.
          </LegalListItem>
        </LegalList>
        <LegalText>
          Em todos os casos, comunicamos por e-mail com prazo razoável para
          regularização ou exportação dos dados, quando aplicável.
        </LegalText>
      </LegalSection>

      <LegalSection id="alteracoes" number="14" title="Alterações nestes termos">
        <LegalCallout icon={AlertCircle} title="Aviso importante" tone="deep">
          <p>
            Estes termos podem ser atualizados de tempos em tempos. Mudanças
            materiais — que afetem direitos ou obrigações — são comunicadas
            por e-mail com pelo menos <LegalStrong>15 dias de antecedência</LegalStrong>{" "}
            antes de entrarem em vigor. Se você não concordar, pode cancelar
            sem custos nesse período.
          </p>
        </LegalCallout>
      </LegalSection>

      <LegalSection id="foro" number="15" title="Lei aplicável e foro">
        <LegalText>
          Estes termos são regidos pelas leis da República Federativa do
          Brasil. Fica eleito o <LegalStrong>foro da comarca da sede da
          Bellory</LegalStrong> para dirimir quaisquer questões, ressalvado o
          direito do consumidor de optar pelo foro de seu domicílio conforme
          o CDC.
        </LegalText>
      </LegalSection>

      <LegalSection id="contato" number="16" title="Fale com a gente">
        <LegalText>
          Dúvidas sobre os termos? Escreva para{" "}
          <LegalLink href="mailto:juridico@bellory.com.br" external>
            juridico@bellory.com.br
          </LegalLink>
          . Para dúvidas técnicas ou de uso da plataforma,{" "}
          <LegalLink href="mailto:suporte@bellory.com.br" external>
            suporte@bellory.com.br
          </LegalLink>{" "}
          ou o WhatsApp disponível na página de{" "}
          <LegalLink href="/#contato">contato</LegalLink>.
        </LegalText>
      </LegalSection>
    </LegalShell>
  )
}
