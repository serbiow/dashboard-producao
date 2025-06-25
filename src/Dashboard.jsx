import { useRef, useState } from "react";
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun } from "docx";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function Dashboard() {
    const [form, setForm] = useState({
        data: "",
        responsavel: "",
        agente: "",
        observacoes: "",
        producao: ["", "", "", "", ""],
    });

    const chartRef = useRef(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleProducaoChange = (index, value) => {
        const novaProducao = [...form.producao];
        novaProducao[index] = value;
        setForm({ ...form, producao: novaProducao });
    };

    const total = form.producao.reduce((acc, val) => acc + (parseInt(val) || 0), 0);

    const gerarDoc = async () => {
        // gerar imagem do gráfico
        const chartDataUrl = await htmlToImage.toPng(chartRef.current);
        const chartBlob = await (await fetch(chartDataUrl)).blob();
        const chartBuffer = await chartBlob.arrayBuffer();

        const doc = new Document({
            sections: [{
                children: [
                    new Paragraph({ text: "Relatório de Produção por Máquina de Raio", heading: "Heading1" }),
                    new Paragraph(`Data do Relatório: ${form.data}`),
                    new Paragraph(`Data da Última Operação Registrada: ${form.data}`),
                    new Paragraph(`Responsável da Operação: ${form.responsavel}`),
                    new Paragraph(`Agente de Carga Responsável pelos Raios-X: ${form.agente}`),

                    new Paragraph({ text: "Resumo da Produção", heading: "Heading2" }),
                    new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Máquina de Raio")] }),
                                    new TableCell({ children: [new Paragraph("Total Remessas")] }),
                                ],
                            }),
                            ...form.producao.map((valor, i) =>
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(`Raio ${i + 1}`)] }),
                                        new TableCell({ children: [new Paragraph(valor || "0")] }),
                                    ],
                                })
                            ),
                            // Adiciona o total geral na tabela do documento
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Total Geral:")], columnSpan: 1 }),
                                    new TableCell({ children: [new Paragraph(`${total}`)] }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({ text: "Gráfico de Produção", heading: "Heading2" }),
                    new Paragraph({
                        children: [
                            new ImageRun({
                                data: chartBuffer,
                                transformation: { width: 600, height: 300 },
                            }),
                        ],
                    }),

                    new Paragraph({ text: "Observações do Dia", heading: "Heading2" }),
                    new Paragraph(form.observacoes),
                    new Paragraph({ text: "Gerado automaticamente pelo Dashboard de Produção." }),
                ],
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `Relatorio_Producao_${form.data}.docx`);
    };

    const chartData = form.producao.map((val, i) => ({
        nome: `Raio ${i + 1}`,
        valor: parseInt(val) || 0,
    }));

    return (
        <div className="dashboard-container">
            <h1>Dashboard de Produção</h1>

            <h2>Dados da Operação</h2>
            <div className="input-row">
                <div className="input-col">
                    <label>Data:</label>
                    <input type="date" name="data" value={form.data} onChange={handleChange} />
                </div>
                <div className="input-col">
                    <label>Responsável:</label>
                    <input type="text" name="responsavel" value={form.responsavel} onChange={handleChange} />
                </div>
                <div className="input-col">
                    <label>Agente de Carga:</label>
                    <input type="text" name="agente" value={form.agente} onChange={handleChange} />
                </div>
            </div>

            <h2>Resumo de Produção</h2>
            <div className="input-row">
                {form.producao.map((val, i) => (
                    <div className="input-col" key={i}>
                        <label>Raio {i + 1}:</label>
                        <input
                            type="number"
                            value={val}
                            onChange={(e) => handleProducaoChange(i, e.target.value)}
                            min={0}
                        />
                    </div>
                ))}
            </div>
            <div className="total-row">
                <label className="total-label">Total:</label>
                <input
                    type="number"
                    value={total}
                    readOnly
                    className="total-input"
                    tabIndex={-1}
                />
            </div>

            <h2>Observações</h2>
            <textarea
                name="observacoes"
                rows={4}
                value={form.observacoes}
                onChange={handleChange}
            />

            <h2>Gráfico de Produção</h2>
            <div ref={chartRef} style={{ width: "100%", height: 300, backgroundColor: "white", borderRadius: 12, boxShadow: "0 2px 8px #e0e7ef" }}>
                <ResponsiveContainer>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="valor" fill="#4ade80" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <button onClick={gerarDoc}>
                Gerar Documento
            </button>
        </div>
    );
}
