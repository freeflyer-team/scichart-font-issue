<script lang="ts">
  import {
    SciChartSurface,
    SciChartDefaults,
    XyDataSeries,
    FastLineRenderableSeries,
    NumericAxis,
    EAxisAlignment,
    type TWebAssemblyChart,
  } from "scichart";
  import { onMount } from "svelte";

  let element1: HTMLDivElement | null = $state(null);
  let element2: HTMLDivElement | null = $state(null);

  function initializeChart(chart: TWebAssemblyChart, title: string): void {
    chart.sciChartSurface.title = title;

    const xAxis = new NumericAxis(chart.wasmContext);
    const yAxis = new NumericAxis(chart.wasmContext);
    chart.sciChartSurface.xAxes.add(xAxis);
    chart.sciChartSurface.yAxes.add(yAxis);

    yAxis.axisAlignment = EAxisAlignment.Left;

    const numSeries = 3;

    for (let i = 0; i < numSeries; i++) {
      const dataSeries = new XyDataSeries(chart.wasmContext);

      const lineSeries = new FastLineRenderableSeries(chart.wasmContext);
      lineSeries.dataSeries = dataSeries;

      chart.sciChartSurface.renderableSeries.add(lineSeries);

      for (let j = 0; j < 100; j++) {
        dataSeries.append(j * 0.01 + 28849, 0.3 * (i + 1) * Math.sin(j / 3) + 0.1 * Math.random());
      }
    }

    chart.sciChartSurface.zoomExtents();
  }

  onMount(async (): Promise<void> => {
    SciChartSurface.UseCommunityLicense();

    if (element1) {
      const chart = await SciChartSurface.create(element1);
      initializeChart(chart, "FreeFlyer Plot 1");
    }

    if (element2) {
      const chart = await SciChartSurface.create(element2);
      initializeChart(chart, "FreeFlyer Plot 2");
    }
  });
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-4);
  }
</style>

<main>
  <div bind:this={element1} class="container" style="width: 400px; height: 300px;"></div>
  <div bind:this={element2} class="container" style="width: 400px; height: 300px;"></div>
</main>
