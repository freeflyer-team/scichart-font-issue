<script lang="ts">
  import { getFontUrl } from "./getFontUrl.ts";
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
  let chart1: TWebAssemblyChart | null = null;
  let chartInitialized = false;

  function initializeChart(chart: TWebAssemblyChart, title: string): void {
    chart.sciChartSurface.preRender.subscribe((r: any) => {
      if (chartInitialized) {
        return; // Chart is already initialized
      }
      chartInitialized = true;

      const fontUrl = getFontUrl("C:/Windows/Fonts/Verdana.ttf");
      chart.sciChartSurface.registerFont("Verdana", fontUrl);
      chart.sciChartSurface.title = title;

      chart.sciChartSurface.titleStyle = {
        fontFamily: "Verdana",
        fontSize: 17.29,
        fontWeight: "bold",
      };

      const xAxis = new NumericAxis(chart.wasmContext);
      xAxis.axisTitle = "X Axis";
      const yAxis = new NumericAxis(chart.wasmContext);
      yAxis.axisTitle = "Y Axis";
      chart.sciChartSurface.xAxes.add(xAxis);
      chart.sciChartSurface.yAxes.add(yAxis);


      xAxis.labelStyle = {
        fontFamily: "Verdana",
        fontSize: 11.97,
        fontWeight: "normal"
      };

      yAxis.labelStyle = {
        fontFamily: "Verdana",
        fontSize: 11.97,
        fontWeight: "normal",
      };
      yAxis.axisAlignment = EAxisAlignment.Left;

      const numSeries = 3;

      for (let i = 0; i < numSeries; i++) {
        const dataSeries = new XyDataSeries(chart.wasmContext);

        const lineSeries = new FastLineRenderableSeries(chart.wasmContext);
        lineSeries.dataSeries = dataSeries;

        chart.sciChartSurface.renderableSeries.add(lineSeries);

        for (let j = 0; j < 100; j++) {
          dataSeries.append(
            j * 0.01 + 28849,
            0.3 * (i + 1) * Math.sin(j / 3) + 0.1 * Math.random(),
          );
        }
      }

      chart.sciChartSurface.zoomExtents();
    });
  }

  onMount(async (): Promise<void> => {
    
    SciChartSurface.UseCommunityLicense();
    SciChartDefaults.useNativeText = true;

    if(element1){
      chart1 = await SciChartSurface.create(element1);
      initializeChart(chart1, "FreeFlyer Plot 1");
      chart1.sciChartSurface.invalidateElement();
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
</main>
