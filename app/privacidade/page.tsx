"use client"

import { Shield, Mail } from "lucide-react"
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
  { id: "resumo", label: "Resumo rápido" },
  { id: "quem-somos", label: "Quem somos" },
  { id: "dados-coletados", label: "Dados que coletamos" },
  { id: "finalidades", label: "Como usamos" },
  { id: "base-legal", label: "Base legal" },
  { id: "compartilhamento", label: "Compartilhamento" },
  { id: "cookies", label: "Cookies" },
  { id: "seus-direitos", label: "Seus direitos" },
  { id: "seguranca", label: "Segurança" },
  { id: "retencao", label: "Tempo de guarda" },
  { id: "criancas", label: "Crianças e adolescentes" },
  { id: "alteracoes", label: "Alterações" },
  { id: "contato", label: "Fale com o DPO" },
]

const related: RelatedPolicy[] = [
  {
    href: "/termos",
    label: "Termos de Uso",
    description:
      "Regras de uso da plataforma, planos, pagamento e cancelamento.",
  },
  {
    href: "/lgpd",
    label: "Central de Privacidade",
    description:
      "Seus direitos como titular e como exercê-los de forma prática.",
  },
]

export default function PrivacidadePage() {
  return (
    <LegalShell
      eyebrow="Privacidade · LGPD"
      title="Política de Privacidade"
      subtitle="Seu dado é seu. A gente só cuida bem. Aqui você entende em linguagem direta o que a gente coleta, por quê e como você está no controle."
      lastUpdated="22 de abril de 2026"
      toc={toc}
      relatedPolicies={related}
    >
      <LegalCallout
        icon={Shield}
        title="Em resumo"
        tone="sage"
      >
        <LegalList>
          <LegalListItem>
            A gente só coleta o que é necessário para o Bellory funcionar ou
            para atender você melhor.
          </LegalListItem>
          <LegalListItem>
            Seus dados (e os dos seus clientes) ficam hospedados no Brasil,
            criptografados e com backup diário.
          </LegalListItem>
          <LegalListItem>
            Nunca vendemos, alugamos ou compartilhamos informações com
            terceiros sem motivo legítimo.
          </LegalListItem>
          <LegalListItem>
            Você tem o direito de acessar, corrigir, exportar e excluir tudo —
            a qualquer momento, em 1 clique.
          </LegalListItem>
        </LegalList>
      </LegalCallout>

      <LegalSection id="resumo" number="00" title="Por que essa política existe">
        <LegalText>
          A Lei Geral de Proteção de Dados (Lei 13.709/2018, a{" "}
          <LegalStrong>LGPD</LegalStrong>) diz que toda empresa que trata dados
          pessoais no Brasil precisa contar, de forma clara, o que faz com
          essas informações. Este documento é o nosso compromisso de fazer
          isso em português humano — sem juridiquês, sem letra miúda.
        </LegalText>
        <LegalText>
          Se algo aqui não estiver claro, escreva para{" "}
          <LegalLink href="mailto:privacidade@bellory.com.br" external>
            privacidade@bellory.com.br
          </LegalLink>{" "}
          e a gente explica.
        </LegalText>
      </LegalSection>

      <LegalSection id="quem-somos" number="01" title="Quem somos">
        <LegalText>
          <LegalStrong>Bellory</LegalStrong> é uma plataforma de gestão para
          salões de beleza, barbearias, clínicas de estética, nail designers e
          spas. Operada no Brasil, é responsável pelo tratamento dos dados
          descritos nesta política na qualidade de{" "}
          <LegalStrong>controladora</LegalStrong> (para os dados da sua conta
          no Bellory) e, em alguns casos, como <LegalStrong>operadora</LegalStrong>{" "}
          (para os dados dos <em>seus</em> clientes que você cadastra no
          sistema — veja o item 04).
        </LegalText>
      </LegalSection>

      <LegalSection
        id="dados-coletados"
        number="02"
        title="Dados que a gente coleta"
      >
        <LegalText>
          A coleta acontece em três momentos diferentes: quando você cria uma
          conta, quando navega no site e quando usa o sistema no dia-a-dia do
          seu negócio.
        </LegalText>

        <LegalSubtitle>No cadastro</LegalSubtitle>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Dados de identificação:</LegalStrong> nome, e-mail,
            telefone, CPF ou CNPJ, razão social.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Dados de endereço:</LegalStrong> CEP, logradouro,
            número, cidade e estado do estabelecimento.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Dados de pagamento:</LegalStrong> últimos 4 dígitos
            do cartão, bandeira e dados de Pix quando aplicável. Os dados
            completos do cartão são processados diretamente pelo nosso
            parceiro certificado PCI-DSS e nunca passam pelos nossos
            servidores.
          </LegalListItem>
        </LegalList>

        <LegalSubtitle>Ao navegar no site</LegalSubtitle>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Dados técnicos:</LegalStrong> endereço IP, tipo de
            navegador, sistema operacional, resolução de tela.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Dados de navegação:</LegalStrong> páginas visitadas,
            tempo de permanência, origem da visita (Google, redes sociais,
            link direto).
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Cookies:</LegalStrong> veja a seção 06 para detalhes.
          </LegalListItem>
        </LegalList>

        <LegalSubtitle>Durante o uso do sistema</LegalSubtitle>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Dados de operação:</LegalStrong> serviços cadastrados,
            preços, horários, configurações da sua agenda.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Dados dos seus clientes:</LegalStrong> informações
            que você cadastra sobre as pessoas que atendem no seu negócio
            (nome, telefone, e-mail, preferências, histórico, anamneses). Para
            esses dados, você é a controladora e o Bellory é operador.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Conversas com a IA:</LegalStrong> mensagens trocadas
            pelo WhatsApp entre seus clientes e o agente virtual, para melhorar
            a qualidade do atendimento.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="finalidades" number="03" title="Para que a gente usa">
        <LegalList>
          <LegalListItem>
            <LegalStrong>Prestar o serviço:</LegalStrong> criar e manter a sua
            conta, processar pagamentos, sincronizar agenda, rodar o agente
            de IA no WhatsApp.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Melhorar o produto:</LegalStrong> entender quais
            funcionalidades são mais usadas, identificar problemas, testar
            novas versões.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Atender você:</LegalStrong> responder dúvidas,
            orientar na configuração, dar suporte técnico.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Comunicação:</LegalStrong> avisar sobre novidades,
            mudanças importantes e ofertas — e aqui sempre com opção de
            descadastramento em 1 clique.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Segurança e compliance:</LegalStrong> prevenir
            fraudes, cumprir obrigações fiscais e atender requisições legais.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="base-legal" number="04" title="Com que base legal">
        <LegalText>
          A LGPD exige que todo tratamento tenha uma justificativa. As nossas
          são:
        </LegalText>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Execução de contrato</LegalStrong> (Art. 7º, V) — para
            tudo que é necessário para o sistema funcionar depois que você
            assina.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Legítimo interesse</LegalStrong> (Art. 7º, IX) — para
            melhorias do produto, segurança e prevenção de fraudes, sempre
            respeitando seus direitos.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Cumprimento de obrigação legal</LegalStrong> (Art. 7º,
            II) — quando a lei exige a guarda ou envio de dados (Receita
            Federal, por exemplo).
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Consentimento</LegalStrong> (Art. 7º, I) — para
            marketing e cookies não-essenciais. Você pode retirar a qualquer
            momento.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection
        id="compartilhamento"
        number="05"
        title="Com quem a gente compartilha"
      >
        <LegalText>
          A gente <LegalStrong>não vende nem aluga</LegalStrong> seus dados. O
          compartilhamento acontece só com parceiros que ajudam o sistema a
          funcionar, e sob contratos que exigem o mesmo nível de proteção que
          praticamos aqui.
        </LegalText>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Infraestrutura em nuvem:</LegalStrong> provedores de
            servidor e banco de dados (com dados hospedados no Brasil).
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Gateway de pagamento:</LegalStrong> processador
            certificado PCI-DSS para Pix, cartão e boleto.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>WhatsApp Business API:</LegalStrong> para o
            funcionamento do agente de IA no WhatsApp.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Ferramentas de analytics e suporte:</LegalStrong>{" "}
            exclusivamente com dados agregados ou pseudonimizados.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Autoridades públicas:</LegalStrong> quando houver
            requisição legal formal (decisão judicial, requisição da ANPD).
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection id="cookies" number="06" title="Cookies e tecnologias similares">
        <LegalText>
          Cookies são pequenos arquivos que ficam no seu navegador para
          lembrar escolhas suas. A gente usa três categorias:
        </LegalText>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Essenciais</LegalStrong> (sempre ativos): login,
            carrinho, segurança. Sem eles o site não funciona.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Analytics</LegalStrong> (opcional): nos ajudam a
            entender como o site é usado, quais páginas mais interessam.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Marketing</LegalStrong> (opcional): mostram ofertas
            relevantes nas redes e reduzem propaganda sem contexto.
          </LegalListItem>
        </LegalList>
        <LegalText>
          Na primeira visita você escolhe o que aceita. Depois, pode mudar a
          qualquer momento em <LegalLink href="/lgpd">Central de Privacidade</LegalLink>.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="seus-direitos"
        number="07"
        title="Seus direitos como titular"
      >
        <LegalText>
          A LGPD garante direitos que você pode exercer a qualquer momento, de
          graça. Toda solicitação é respondida em até 15 dias úteis.
        </LegalText>
        <LegalList>
          <LegalListItem>
            <LegalStrong>Confirmação e acesso:</LegalStrong> saber se tratamos
            seus dados e obter uma cópia.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Correção:</LegalStrong> atualizar dados incompletos,
            incorretos ou desatualizados.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Anonimização, bloqueio ou exclusão</LegalStrong> de
            dados desnecessários ou tratados em desconformidade.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Portabilidade:</LegalStrong> receber seus dados em
            formato estruturado (JSON ou Excel) para levar para outro serviço.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Revogação do consentimento:</LegalStrong> retirar a
            autorização para tratamentos que dependem dela (marketing,
            cookies).
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Informação sobre compartilhamento:</LegalStrong> saber
            com quem dividimos seus dados.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Oposição:</LegalStrong> contestar tratamentos
            baseados em legítimo interesse.
          </LegalListItem>
        </LegalList>
        <LegalText>
          Para exercer qualquer um: escreva para{" "}
          <LegalLink href="mailto:privacidade@bellory.com.br" external>
            privacidade@bellory.com.br
          </LegalLink>{" "}
          ou use o botão dedicado na <LegalLink href="/lgpd">Central de Privacidade</LegalLink>.
        </LegalText>
      </LegalSection>

      <LegalSection
        id="seguranca"
        number="08"
        title="Como a gente protege os dados"
      >
        <LegalList>
          <LegalListItem>
            <LegalStrong>Criptografia AES-256</LegalStrong> em repouso (no
            banco de dados) e TLS 1.3 em trânsito (na rede).
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Hospedagem no Brasil</LegalStrong>, em data centers
            certificados ISO 27001 e SOC 2 Type II.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Backups diários</LegalStrong> com retenção de 30 dias
            e testes mensais de restauração.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Controle de acesso interno</LegalStrong> mínimo e por
            função — ninguém do time vê dado que não precisa ver.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Monitoramento 24/7</LegalStrong> com alertas
            automáticos para qualquer acesso anômalo.
          </LegalListItem>
        </LegalList>
        <LegalText>
          Em caso de incidente de segurança, comunicaremos a ANPD e os
          titulares afetados dentro dos prazos legais.
        </LegalText>
      </LegalSection>

      <LegalSection id="retencao" number="09" title="Por quanto tempo a gente guarda">
        <LegalList>
          <LegalListItem>
            <LegalStrong>Conta ativa:</LegalStrong> enquanto você estiver
            usando o Bellory.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Após o cancelamento:</LegalStrong> seus dados são
            mantidos por até 90 dias para facilitar uma eventual reativação e
            depois excluídos, exceto:
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Dados fiscais</LegalStrong> (notas, recibos): 5 anos,
            por exigência da Receita Federal.
          </LegalListItem>
          <LegalListItem>
            <LegalStrong>Logs de segurança:</LegalStrong> 6 meses.
          </LegalListItem>
        </LegalList>
      </LegalSection>

      <LegalSection
        id="criancas"
        number="10"
        title="Crianças e adolescentes"
      >
        <LegalText>
          O Bellory não é destinado a menores de 18 anos. A gente não coleta
          intencionalmente dados de crianças ou adolescentes. Se você é
          responsável legal e suspeita que seu filho forneceu dados aqui,
          entre em contato — vamos excluir imediatamente.
        </LegalText>
      </LegalSection>

      <LegalSection id="alteracoes" number="11" title="Quando essa política muda">
        <LegalText>
          A gente pode atualizar este documento de tempos em tempos. Mudanças
          relevantes são avisadas por e-mail com pelo menos 15 dias de
          antecedência e ficam registradas no histórico de versões.
        </LegalText>
      </LegalSection>

      <LegalSection id="contato" number="12" title="Fale com o nosso DPO">
        <LegalCallout icon={Mail} title="Encarregado de Dados" tone="accent">
          <p>
            Para qualquer dúvida, solicitação ou reclamação sobre o
            tratamento dos seus dados, fale com o nosso Encarregado pela
            Proteção de Dados (DPO):
          </p>
          <p>
            <LegalStrong>E-mail:</LegalStrong>{" "}
            <LegalLink href="mailto:dpo@bellory.com.br" external>
              dpo@bellory.com.br
            </LegalLink>
          </p>
          <p>
            <LegalStrong>Prazo de resposta:</LegalStrong> até 15 dias úteis.
          </p>
          <p>
            Se não ficar satisfeito com a resposta, você pode procurar a{" "}
            <LegalLink href="https://www.gov.br/anpd" external>
              Autoridade Nacional de Proteção de Dados (ANPD)
            </LegalLink>
            .
          </p>
        </LegalCallout>
      </LegalSection>
    </LegalShell>
  )
}
